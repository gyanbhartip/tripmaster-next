'use server';

import { parseTripData } from '@/utils/trip';
import { createSessionClient } from './client';

const appwriteConfig = {
    databaseId: process.env.NEXT_APPWRITE_DATABASE_ID ?? '',
    userCollectionId: process.env.NEXT_APPWRITE_USERS_COLLECTION_ID ?? '',
    tripCollectionId: process.env.NEXT_APPWRITE_TRIPS_COLLECTION_ID ?? '',
};

type Document = {
    [key: string]: unknown;
};

type FilterByDate = (
    items: Array<Document>,
    key: string,
    start: string,
    end?: string,
) => number;

export const getUserAndTripStats = async (): Promise<DashboardStats> => {
    const d = new Date();
    const startCurrent = new Date(
        d.getFullYear(),
        d.getMonth(),
        1,
    ).toISOString();
    const startPrev = new Date(
        d.getFullYear(),
        d.getMonth() - 1,
        1,
    ).toISOString();
    const endPrev = new Date(d.getFullYear(), d.getMonth(), 0).toISOString();
    const { databases } = await createSessionClient();

    const [trips, users] = await Promise.all([
        databases?.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.tripCollectionId,
        ),
        databases?.listDocuments<UserDocument>(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
        ),
    ]);

    const filterByDate: FilterByDate = (items, key, start, end) =>
        items.filter(item => item[key] >= start && (!end || item[key] <= end))
            .length;

    const filterUsersByRole = (role: string) =>
        users.documents.filter((u: UserDocument) => u.status === role);

    return {
        totalUsers: users.total,
        usersJoined: {
            currentMonth: filterByDate(
                users.documents,
                'joinedAt',
                startCurrent,
                undefined,
            ),
            lastMonth: filterByDate(
                users.documents,
                'joinedAt',
                startPrev,
                endPrev,
            ),
        },
        userRole: {
            total: filterUsersByRole('user').length,
            currentMonth: filterByDate(
                filterUsersByRole('user'),
                'joinedAt',
                startCurrent,
                undefined,
            ),
            lastMonth: filterByDate(
                filterUsersByRole('user'),
                'joinedAt',
                startPrev,
                endPrev,
            ),
        },
        totalTrips: trips.total,
        tripsCreated: {
            currentMonth: filterByDate(
                trips.documents,
                'createdAt',
                startCurrent,
                undefined,
            ),
            lastMonth: filterByDate(
                trips.documents,
                'createdAt',
                startPrev,
                endPrev,
            ),
        },
    };
};

export const getUserGrowthPerDay = async () => {
    const { databases } = await createSessionClient();
    const users = await databases?.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
    );

    const userGrowth = users.documents.reduce(
        (acc: { [key: string]: number }, user: Document) => {
            const date = new Date(user.joinedAt);
            const day = date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
            });
            acc[day] = (acc[day] || 0) + 1;
            return acc;
        },
        {},
    );

    return Object.entries(userGrowth).map(([day, count]) => ({
        count: Number(count),
        day,
    }));
};

export const getTripsCreatedPerDay = async () => {
    const { databases } = await createSessionClient();
    const trips = await databases?.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.tripCollectionId,
    );

    const tripsGrowth = trips.documents.reduce(
        (acc: { [key: string]: number }, trip: Document) => {
            const date = new Date(trip.createdAt);
            const day = date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
            });
            acc[day] = (acc[day] || 0) + 1;
            return acc;
        },
        {},
    );

    return Object.entries(tripsGrowth).map(([day, count]) => ({
        count: Number(count),
        day,
    }));
};

export const getTripsByTravelStyle = async () => {
    const { databases } = await createSessionClient();
    const trips = await databases?.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.tripCollectionId,
    );

    const travelStyleCounts = trips.documents.reduce(
        (acc: { [key: string]: number }, trip: Document) => {
            const tripDetail = parseTripData(trip.tripDetail);

            if (tripDetail?.travelStyle) {
                const travelStyle = tripDetail.travelStyle;
                acc[travelStyle] = (acc[travelStyle] || 0) + 1;
            }
            return acc;
        },
        {},
    );

    return Object.entries(travelStyleCounts).map(([travelStyle, count]) => ({
        count: Number(count),
        travelStyle,
    }));
};
