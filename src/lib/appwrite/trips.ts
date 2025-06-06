'use server';

import { Query } from 'node-appwrite';
import { createSessionClient } from './client';

const appwriteConfig = {
    databaseId: process.env.NEXT_APPWRITE_DATABASE_ID ?? '',
    tripCollectionId: process.env.NEXT_APPWRITE_TRIPS_COLLECTION_ID ?? '',
};

export const getAllTrips = async (limit: number, offset: number) => {
    try {
        const { databases } = await createSessionClient();
        const allTrips = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.tripCollectionId,
            [
                Query.limit(limit),
                Query.offset(offset),
                Query.orderDesc('createdAt'),
            ],
        );
        if (allTrips.total === 0) {
            console.error('No trips found');
            return {
                allTrips: [],
                total: 0,
            };
        }
        return {
            allTrips: allTrips.documents,
            total: allTrips.total,
        };
    } catch (error) {
        console.error('error in getAllTrips: ', error);
        return {
            allTrips: [],
            total: 0,
        };
    }
};

export const getTripById = async (tripId: string) => {
    const { databases } = await createSessionClient();
    const trip = await databases.getDocument(
        appwriteConfig.databaseId,
        appwriteConfig.tripCollectionId,
        tripId,
    );

    if (!trip.$id) {
        console.warn('Trip not found');
        return null;
    }
    return trip;
};
