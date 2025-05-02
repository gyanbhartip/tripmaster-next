import TripsList from '@/components/trips-list';
import { getTrips } from '@/lib/actions/trip';

export const dynamic = 'force-dynamic';

const TripsPage = async ({ params: { page = 1, limit = 8 } }) => {
    const { total, trips } = await getTrips(page, limit);

    return (
        <main>
            <TripsList total={total} trips={trips} />
        </main>
    );
};

export default TripsPage;
