'use client';

import {
    tripXAxis,
    tripyAxis,
    userXAxis,
    useryAxis,
} from '@/lib/constants/app-constants';
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
import { ChartContainer, type ChartConfig } from './ui/chart';
import { Bar, BarChart } from 'recharts';

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
    console.log(
        '🚀 ~ DashboardCharts ~ tripsByTravelStyle:',
        tripsByTravelStyle,
    );
    return (
        <>
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
                {/* <ChartComponent
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
                </ChartComponent> */}
                <ChartContainer
                    config={tripTrendsChartConfig}
                    className="min-h-[200px] w-full">
                    <BarChart data={tripsByTravelStyle}>
                        <Bar
                            dataKey={'travelStyle'}
                            fill="var(--color-travelStyle)"
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
