import Header from '@/components/header';
import StatsCard from '@/components/stats-card';
import TripCard from '@/components/trip-card';
import {
    Category,
    ChartComponent,
    ColumnSeries,
    DataLabel,
    Inject,
    Legend,
    SeriesCollectionDirective,
    SeriesDirective,
    SplineAreaSeries,
    Tooltip,
} from '@syncfusion/ej2-react-charts';
import {
    ColumnDirective,
    ColumnsDirective,
    GridComponent,
} from '@syncfusion/ej2-react-grids';

const DashboardPage = () => (
    <main className="dashboard wrapper">
        <Header
            title={`Welcome ${user?.name ?? 'Guest'}`}
            description="Track activity, trends and popular destinations in real time"
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
                {allTrips.map(
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
                            name={name}
                            imageUrl={imageUrls[0]}
                            location={itinerary?.[0]?.location ?? ''}
                            tags={[interests, travelStyle]}
                            price={estimatedPrice}
                        />
                    ),
                )}
            </div>
        </section>
        <section className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <ChartComponent
                id="chart-1"
                primaryXAxis={userXAxis}
                primaryYAxis={useryAxis}
                title="User Growth"
                tooltip={{ enable: true }}>
                <Inject
                    services={[
                        ColumnSeries,
                        SplineAreaSeries,
                        Category,
                        DataLabel,
                        Tooltip,
                        Legend,
                    ]}
                />
                <SeriesCollectionDirective>
                    <SeriesDirective
                        dataSource={userGrowth}
                        xName="day"
                        yName="count"
                        type="Column"
                        name="Column"
                        columnWidth={0.3}
                        cornerRadius={{ topLeft: 10, topRight: 10 }}
                    />
                    <SeriesDirective
                        dataSource={userGrowth}
                        xName="day"
                        yName="count"
                        type="SplineArea"
                        name="Wave"
                        fill="rgba(71,132,238,0.3)"
                        border={{
                            width: 2,
                            color: '#4784EE',
                        }}
                    />
                </SeriesCollectionDirective>
            </ChartComponent>
            <ChartComponent
                id="chart-2"
                primaryXAxis={tripXAxis}
                primaryYAxis={tripyAxis}
                title="Trip Trends"
                tooltip={{ enable: true }}>
                <Inject
                    services={[
                        ColumnSeries,
                        SplineAreaSeries,
                        Category,
                        DataLabel,
                        Tooltip,
                        Legend,
                    ]}
                />
                <SeriesCollectionDirective>
                    <SeriesDirective
                        dataSource={tripsByTravelStyle}
                        xName="travelStyle"
                        yName="count"
                        type="Column"
                        name="day"
                        columnWidth={0.3}
                        cornerRadius={{ topLeft: 10, topRight: 10 }}
                    />
                </SeriesCollectionDirective>
            </ChartComponent>
        </section>
        <section className="user-trip wrapper">
            {usersAndTrips.map(
                ({ title, dataSource, field, headerText }, index) => (
                    <div key={index} className="flex flex-col gap-5">
                        <h3 className="p-20-semibold text-dark-100">{title}</h3>
                        <GridComponent dataSource={dataSource} gridLines="None">
                            <ColumnsDirective>
                                <ColumnDirective
                                    field="name"
                                    headerText="Name"
                                    width={'200'}
                                    textAlign="Left"
                                    template={({
                                        imageUrl,
                                        name,
                                    }: UserData) => (
                                        <div className="flex items-center gap-1.5 px-4">
                                            <img
                                                src={imageUrl}
                                                alt="user"
                                                className="aspect-square size-8 rounded-full"
                                                referrerPolicy="no-referrer"
                                            />
                                            <span>{name}</span>
                                        </div>
                                    )}
                                />
                                <ColumnDirective
                                    field={field}
                                    headerText={headerText}
                                    width={'150'}
                                    textAlign="Left"
                                />
                            </ColumnsDirective>
                        </GridComponent>
                    </div>
                ),
            )}
        </section>
    </main>
);

export default DashboardPage;
