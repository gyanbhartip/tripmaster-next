import { getAllTrips } from '@/lib/appwrite/trips';
import { parseTripData } from '@/utils/trip';
import { type NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest): Promise<NextResponse> => {
    const limit = 8;
    const url = new URL(request.url);
    const page = Number.parseInt(url.searchParams.get('page') || '1', 10);
    const offset = (page - 1) * limit;
    const { allTrips, total } = await getAllTrips(limit, offset);
    return NextResponse.json({
        total,
        trips: allTrips.map(({ $id, tripDetail, imageUrls }) => ({
            id: $id,
            imageUrls: imageUrls || [],
            ...parseTripData(tripDetail),
        })),
    });
};
