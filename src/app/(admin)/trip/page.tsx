import TripsList from '@/components/trips-list';
import { getTrips } from '@/lib/actions/trip';
import { Suspense } from 'react';

// export const dynamic = 'force-dynamic';

// type Props = {
//     params: Awaited<{ page?: number | undefined; limit?: number | undefined }>;
// };

const TripsPage = async props => {
    const { total, trips } = await getTrips(1, 8);

    return (
        <main>
            <Suspense
                fallback={
                    <div className="text-dark-400 font-semibold">
                        Loading trips list...
                    </div>
                }>
                <TripsList total={total} trips={trips} />
            </Suspense>
        </main>
    );
};

export default TripsPage;
