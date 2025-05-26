'use client';

import { getTrips } from '@/lib/actions/trip';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from './header';
import TripCard from './trip-card';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from './ui/pagination';

const LIMIT = 8;

const TripsList = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pageFromURL = Number(searchParams.get('page') || '1');
    const [currentPage, setCurrentPage] = useState(pageFromURL);

    const [trips, setTrips] = useState<
        Awaited<ReturnType<typeof getTrips>>['trips']
    >([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchTrips = async () => {
            const { trips, total } = await getTrips(currentPage, LIMIT);
            setTrips(trips);
            setTotal(total);
        };
        fetchTrips();
    }, [currentPage]);

    const totalPages = Math.ceil(total / LIMIT);

    const goToPage = (page: number) => {
        setCurrentPage(page);
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', page.toString());
        router.push(`?${params.toString()}`);
    };

    return (
        <main className="all-users wrapper">
            <Header
                ctaText="Create a trip"
                ctaUrl="/trip/create"
                description="View and edit AI-generated travel plans"
                title="Trips"
            />
            <section>
                <h1 className="p-24-semibold text-dark-100 mb-4">
                    Manage Created Trips
                </h1>
                <div className="trip-grid mb-4">
                    {Array.isArray(trips) &&
                        trips.length > 0 &&
                        trips.map(
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
                                    id={id}
                                    name={name}
                                    imageUrl={imageUrls[0] ?? ''}
                                    location={itinerary?.[0]?.location ?? ''}
                                    tags={[interests, travelStyle]}
                                    price={estimatedPrice}
                                />
                            ),
                        )}
                </div>
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={() =>
                                    currentPage > 1 && goToPage(currentPage - 1)
                                }
                            />
                        </PaginationItem>
                        {Array.from({ length: totalPages }).map((_, idx) => (
                            <PaginationItem key={idx}>
                                <PaginationLink
                                    href="#"
                                    isActive={currentPage === idx + 1}
                                    onClick={() => goToPage(idx + 1)}>
                                    {idx + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        {totalPages > 5 && <PaginationEllipsis />}
                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={() =>
                                    currentPage < totalPages &&
                                    goToPage(currentPage + 1)
                                }
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </section>
        </main>
    );
};

export default TripsList;
