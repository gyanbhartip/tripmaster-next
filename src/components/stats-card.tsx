import { calculateTrendPercentage, cn } from '@/utils/misc';
const StatsCard = ({
    headerTitle,
    total,
    currentMonthCount,
    lastMonthCount,
}: StatsCard) => {
    const { percentage, trend } = calculateTrendPercentage(
        currentMonthCount,
        lastMonthCount,
    );
    const isDecrement = trend === 'decrement';
    return (
        <article className="stats-card">
            <h3 className="text-base font-medium">{headerTitle}</h3>
            <div className="content">
                <div className="flex flex-col gap-4">
                    <h2 className="text-4xl font-semibold">{total}</h2>
                    <div className="flex items-center gap-2">
                        <figure className="flex items-center gap-1">
                            <img
                                src={`/assets/icons/arrow-${
                                    isDecrement ? 'down-red' : 'up-green'
                                }.svg`}
                                alt="arrow"
                                className="size-5"
                            />
                            <figcaption
                                className={cn(
                                    'text-sm font-medium',
                                    isDecrement
                                        ? 'text-red-500'
                                        : 'text-success-700',
                                )}>
                                {Math.round(percentage)}%
                            </figcaption>
                        </figure>
                        <p className="truncate text-sm font-medium text-gray-500">
                            vs last month
                        </p>
                    </div>
                </div>
                <img
                    src={`/assets/icons/${isDecrement ? 'decrement' : 'increment'}.svg`}
                    alt="trend chart"
                    className="h-full w-full md:h-32 xl:h-full xl:w-32"
                />
            </div>
        </article>
    );
};

export default StatsCard;
