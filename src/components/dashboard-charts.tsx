'use client';
import { Bar, BarChart, CartesianGrid, Label, XAxis, YAxis } from 'recharts';
import {
    type ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from './ui/chart';

type Props = {
    tripsByTravelStyle: Array<{
        count: number;
        travelStyle: string;
    }>;
    userGrowth: Array<{
        count: number;
        day: string;
    }>;
};

const DashboardCharts = ({ tripsByTravelStyle, userGrowth }: Props) => {
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
