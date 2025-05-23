'use client';
import type { ColumnDef } from '@tanstack/react-table';
import { Bar, BarChart, CartesianGrid, Label, XAxis, YAxis } from 'recharts';
import {
    type ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from './ui/chart';
import DataTable from './ui/data-table';

type Props = {
    mappedUsers?: Array<UsersItineraryCount>;
    trips?: Array<{
        imageUrl: string;
        name: string | undefined;
        interests: string | undefined;
    }>;
    tripsByTravelStyle: Array<{
        count: number;
        travelStyle: string;
    }>;
    userGrowth: Array<{
        count: number;
        day: string;
    }>;
};

const DashboardCharts = ({
    mappedUsers,
    trips,
    tripsByTravelStyle,
    userGrowth,
}: Props) => {
    return (
        <>
            <section className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                <ChartContainer
                    config={userGrowthChartConfig}
                    className="min-h-[200px] w-full">
                    <BarChart data={userGrowth} accessibilityLayer={true}>
                        <CartesianGrid stroke="#b5b5b5" />
                        <XAxis
                            axisLine={false}
                            dataKey="day"
                            label={{
                                value: 'Day',
                                position: 'insideBottom',
                                offset: -2,
                                style: {
                                    fontSize: '14px',
                                    fill: 'var(--color-text)',
                                    fontWeight: 600,
                                },
                            }}
                            tickLine={false}
                        />
                        <YAxis
                            allowDecimals={false}
                            axisLine={false}
                            dataKey="count"
                            domain={[0, 10]}
                            scale={'linear'}
                            tickMargin={4}
                            tickLine={false}>
                            <Label
                                angle={-90}
                                style={{
                                    fontSize: '14px',
                                    fill: 'var(--color-text)',
                                    fontWeight: 600,
                                }}>
                                Count
                            </Label>
                        </YAxis>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dashed" />}
                        />
                        <Bar
                            dataKey={'count'}
                            fill="var(--color-day)"
                            maxBarSize={50}
                            radius={4}
                        />
                    </BarChart>
                </ChartContainer>
                <ChartContainer
                    config={tripTrendsChartConfig}
                    className="min-h-[200px] w-full">
                    <BarChart
                        data={tripsByTravelStyle}
                        accessibilityLayer={true}>
                        <CartesianGrid stroke="#b5b5b5" />
                        <XAxis
                            dataKey="travelStyle"
                            axisLine={false}
                            tickLine={false}>
                            <Label
                                offset={-2}
                                position={'insideBottom'}
                                style={{
                                    fontSize: '14px',
                                    fill: 'var(--color-text)',
                                    fontWeight: 600,
                                }}>
                                Travel Styles
                            </Label>
                        </XAxis>
                        <YAxis
                            allowDecimals={false}
                            axisLine={false}
                            dataKey="count"
                            domain={[0, 10]}
                            label={{
                                angle: -90,
                                value: 'Count',
                                style: {
                                    fontSize: '14px',
                                    fill: 'var(--color-text)',
                                    fontWeight: 600,
                                },
                            }}
                            scale={'linear'}
                            tickLine={false}
                            tickMargin={4}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dashed" />}
                        />
                        <Bar
                            dataKey={'count'}
                            fill="var(--color-travelStyle)"
                            maxBarSize={50}
                            radius={4}
                        />
                    </BarChart>
                </ChartContainer>
            </section>

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
                {trips ? (
                    <div className="flex flex-col gap-5">
                        <h3 className="p-20-semibold text-dark-100">
                            Trips based on interests
                        </h3>
                        <DataTable data={trips} columns={tripInterestColumns} />
                    </div>
                ) : null}
            </section>
        </>
    );
};

export default DashboardCharts;

const userGrowthChartConfig = {
    day: {
        label: 'Day',
        color: '#4784EE',
    },
} satisfies ChartConfig;

const tripTrendsChartConfig = {
    travelStyle: {
        label: 'Travel Style',
        color: '#4784EE',
    },
} satisfies ChartConfig;

const userSignupColumns: Array<ColumnDef<UsersItineraryCount>> = [
    {
        accessorKey: 'name',
        header: 'Name',
        cell: ({
            row: {
                original: { imageUrl, name },
            },
        }) => {
            return (
                <div className="flex min-w-fit items-center gap-2">
                    <img
                        src={imageUrl}
                        alt={name}
                        className="h-8 w-8 rounded-full"
                    />
                    <span>{name}</span>
                </div>
            );
        },
    },
    {
        accessorKey: 'count',
        header: 'Trips Created',
    },
];

const tripInterestColumns: Array<
    ColumnDef<{
        imageUrl: string;
        name: string | undefined;
        interests: string | undefined;
    }>
> = [
    {
        accessorKey: 'name',
        header: 'Name',
        cell: ({
            row: {
                original: { imageUrl, name },
            },
        }) => {
            return (
                <div className="flex min-w-fit items-center gap-2">
                    <img
                        src={imageUrl}
                        alt={name}
                        className="h-8 w-8 rounded-full"
                    />
                    <span>{name}</span>
                </div>
            );
        },
    },
    {
        accessorKey: 'interests',
        header: 'Interests',
    },
];
