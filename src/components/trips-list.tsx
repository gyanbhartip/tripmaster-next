'use client';

import {
    usePathname,
    //  useSearchParams
} from 'next/navigation';
// import { useState } from 'react';
import Header from './header';
import TripCard from './trip-card';
// import { PagerComponent } from '@syncfusion/ej2-react-grids';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from './ui/pagination';

type Props = {
    total: number;
    trips: Array<Trip>;
};

const TripsList = ({
    //  total,
    trips,
}: Props) => {
    // const searchParams = useSearchParams();
    // const initialPage = Number(searchParams.get('page') || '1');
    // const [currentPage, setCurrentPage] = useState(initialPage);

    // const handlePageChange = (page: number) => {
    //     setCurrentPage(page);
    //     window.location.search = `?page=${page}`;
    // };

    const pathName = usePathname();
    return (
        <main className="all-users wrapper">
            <Header
                ctaText="Create a trip"
                ctaUrl="/trips/create"
                description="View and edit AI-generated travel plans"
                title="Trips"
                pathName={pathName}
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
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
                {/* <PagerComponent
                    totalRecordsCount={total}
                    pageSize={8}
                    currentPage={currentPage}
                    click={args => handlePageChange(args.currentPage)}
                    cssClass="mb-4!"
                /> */}
            </section>
        </main>
    );
};

export default TripsList;
