import DashboardCharts from '@/components/dashboard-charts';
import Header from '@/components/header';
import StatsCard from '@/components/stats-card';
import TripCard from '@/components/trip-card';
import DataTable from '@/components/ui/data-table';
import { getCurrentUser } from '@/lib/actions/user';
import { getAllUsers } from '@/lib/appwrite/auth';
import {
    getTripsByTravelStyle,
    getUserAndTripStats,
    getUserGrowthPerDay,
} from '@/lib/appwrite/dashboard';
import { getAllTrips } from '@/lib/appwrite/trips';
import { parseTripData } from '@/utils/trip';
import type { ColumnDef } from '@tanstack/react-table';
import { headers } from 'next/headers';

const DashboardPage = async () => {
    const [
        user,
        dashboardStats,
        trips,
        userGrowth,
        tripsByTravelStyle,
        allUsers,
    ] = await Promise.all([
        getCurrentUser(),
        getUserAndTripStats(),
        getAllTrips(4, 0),
        getUserGrowthPerDay(),
        getTripsByTravelStyle(),
        getAllUsers(4, 0),
    ]);
    const allTrips = trips?.allTrips.map(({ $id, tripDetail, imageUrls }) => ({
        id: $id,
        imageUrls: imageUrls || [],
        ...parseTripData(tripDetail),
    }));

    const mappedUsers: Array<UsersItineraryCount> = allUsers.users.map(
        ({ imageUrl, name, itineraryCount }) => ({
            imageUrl,
            name,
            count: itineraryCount ?? Math.floor(Math.random() * 10),
        }),
    );
    const _trips = allTrips?.map(({ imageUrls, name, interests }) => ({
        imageUrl: imageUrls[0],
        name,
        interests,
    }));

    const headersList = await headers();
    const rawUrl = headersList.get('x-next-url') || '/';
    const pathname = new URL(rawUrl, 'http://localhost').pathname;

    const { totalTrips, tripsCreated, totalUsers, userRole, usersJoined } =
        dashboardStats;
    return (
        <main className="dashboard wrapper">
            <Header
                title={`Welcome ${user?.name ?? 'Guest'}`}
                description="Track activity, trends and popular destinations in real time"
                pathName={pathname}
            />
            <section className="flex flex-col gap-6">
                <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
                    <StatsCard
                        headerTitle="Total Users"
                        total={totalUsers}
                        currentMonthCount={usersJoined.currentMonth}
                        lastMonthCount={usersJoined.lastMonth}
                    />
                    <StatsCard
                        headerTitle="Total Trips"
                        total={totalTrips}
                        currentMonthCount={tripsCreated.currentMonth}
                        lastMonthCount={tripsCreated.lastMonth}
                    />
                    <StatsCard
                        headerTitle="Active Users"
                        total={userRole.total}
                        currentMonthCount={userRole.currentMonth}
                        lastMonthCount={userRole.lastMonth}
                    />
                </div>
            </section>
            <section className="container">
                <h1 className="text-dark-100 text-xl font-semibold">
                    Created Trips
                </h1>
                <div className="trip-grid">
                    {allTrips?.map(
                        ({
                            id,
                            name,
                            imageUrls,
                            itinerary,
                            interests,
                            travelStyle,
                            estimatedPrice,
                        }) => (
                            <TripCard
                                key={id}
                                id={id.toString()}
                                name={name ?? ''}
                                imageUrl={imageUrls[0]}
                                location={itinerary?.[0]?.location ?? ''}
                                tags={[interests ?? '', travelStyle ?? '']}
                                price={estimatedPrice ?? ''}
                            />
                        ),
                    )}
                </div>
            </section>
            <DashboardCharts
                tripsByTravelStyle={tripsByTravelStyle}
                userGrowth={userGrowth}
            />
            <section className="user-trip wrapper">
                {mappedUsers ? (
                    <div className="flex flex-col gap-5">
                        <h3 className="p-20-semibold text-dark-100">
                            Latest user signups
                        </h3>
                        <DataTable
                            data={mappedUsers}
                            columns={userSignupColumns}
                        />
                    </div>
                ) : null}
                {_trips ? (
                    <div className="flex flex-col gap-5">
                        <h3 className="p-20-semibold text-dark-100">
                            Trips based on interests
                        </h3>
                        <DataTable
                            data={_trips}
                            columns={tripInterestColumns}
                        />
                    </div>
                ) : null}
            </section>
        </main>
    );
};

export default DashboardPage;

const userSignupColumns: Array<ColumnDef<UsersItineraryCount>> = [
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'count',
        header: 'Trips Created',
    },
];

const tripInterestColumns: Array<
    ColumnDef<{
        imageUrl: unknown;
        name: string | undefined;
        interests: string | undefined;
    }>
> = [
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'interests',
        header: 'Interests',
    },
];
