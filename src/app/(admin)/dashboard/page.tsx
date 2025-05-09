import Header from '@/components/header';
import { headers } from 'next/headers';

const DashboardPage = async () => {
    // const { account, databases } = await createAdminClient();
    // const user = await account.get();
    const user = {
        name: 'Dave Bautista',
        email: 'mail@cena.com',
    };
    // const [
    //     // user,
    //     dashboardStats,
    //     trips,
    //     userGrowth,
    //     tripsByTravelStyle,
    //     // allUsers,
    // ] = await Promise.all([
    //     // auth.getUser(),
    //     getUserAndTripStats(),
    //     getAllTrips(4, 0),
    //     getUserGrowthPerDay(),
    //     getTripsByTravelStyle(),
    //     // getAllUsers(4, 0),
    // ]);
    // const allTrips = trips?.allTrips.map(({ $id, tripDetail, imageUrls }) => ({
    //     id: $id,
    //     imageUrls: imageUrls || [],
    //     ...parseTripData(tripDetail),
    // }));

    // const mappedUsers: Array<UsersItineraryCount> = allUsers.users.map(
    //     ({ imageUrl, name, itineraryCount }) => ({
    //         imageUrl,
    //         name,
    //         count: itineraryCount ?? Math.floor(Math.random() * 10),
    //     }),
    // );
    // const _trips = allTrips?.map(({ imageUrls, name, interests }) => ({
    //     imageUrl: imageUrls[0],
    //     name,
    //     interests,
    // }));

    // const usersAndTrips = [
    //     {
    //         title: 'Latest user signups',
    //         // dataSource: mappedUsers,
    //         field: 'count',
    //         headerText: 'Trips Created',
    //     },
    //     {
    //         title: 'Trips based on interests',
    //         // dataSource: _trips,
    //         field: 'interests',
    //         headerText: 'Interests',
    //     },
    // ];

    const headersList = await headers();
    const rawUrl = headersList.get('x-next-url') || '/';
    const pathname = new URL(rawUrl, 'http://localhost').pathname;

    // const { totalTrips, tripsCreated, totalUsers, userRole, usersJoined } =
    //     dashboardStats;
    return (
        <main className="dashboard wrapper">
            <Header
                title={`Welcome ${user?.name ?? 'Guest'}`}
                description="Track activity, trends and popular destinations in real time"
                pathName={pathname}
            />
            <section className="flex flex-col gap-6">
                <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
                    {/* <StatsCard
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
                    /> */}
                </div>
            </section>
            <section className="container">
                <h1 className="text-dark-100 text-xl font-semibold">
                    Created Trips
                </h1>
                <div className="trip-grid">
                    {/* {allTrips?.map(
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
                    )} */}
                </div>
            </section>
            {/* <DashboardCharts
                tripsByTravelStyle={tripsByTravelStyle}
                userGrowth={userGrowth}
                usersAndTrips={usersAndTrips}
            /> */}
        </main>
    );
};

export default DashboardPage;
