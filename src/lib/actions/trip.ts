'use server';

import { parseTripData } from '@/utils/trip';
import { getAllTrips } from '../appwrite/trips';

export const getTrips = async (page = 1, limit = 8) => {
    const offset = (page - 1) * limit;

    const { allTrips, total } = await getAllTrips(limit, offset);

    const trips = allTrips.map(({ $id, tripDetail, imageUrls }) => ({
        id: $id,
        imageUrls: imageUrls || [],
        ...parseTripData(tripDetail),
    })) as Array<Trip>;

    return {
        total,
        trips,
    };
};
