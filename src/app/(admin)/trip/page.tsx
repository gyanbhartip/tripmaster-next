import TripsList from '@/components/trips-list';
import { Suspense } from 'react';

// export const dynamic = 'force-dynamic';

const TripsPage = () => {
    return (
        <main>
            <Suspense
                fallback={
                    <div className="text-dark-400 font-semibold">
                        Loading trips list...
                    </div>
                }>
                <TripsList />
            </Suspense>
        </main>
    );
};

export default TripsPage;
