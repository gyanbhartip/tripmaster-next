import { cn, getFirstWord } from '@/utils/misc';
import {
    ChipDirective,
    ChipListComponent,
    ChipsDirective,
} from '@syncfusion/ej2-react-buttons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TripCard = ({
    id,
    imageUrl,
    location,
    name,
    price,
    tags,
}: TripCardProps) => {
    const pathName = usePathname();
    return (
        <Link
            href={
                pathName === '/' || pathName.startsWith('/travel')
                    ? `/travel/${id}`
                    : `/trip/${id}`
            }
            className="trip-card">
            <img src={imageUrl} alt={name} />
            <article>
                <h2>{name}</h2>
                <figure>
                    <img
                        src="/assets/icons/location-mark.svg"
                        alt="location"
                        className="size-4"
                    />
                    <figcaption>{location}</figcaption>
                </figure>
            </article>
            <div className="mt-5 pr-3.5 pb-5 pl-[18px]">
                <ChipListComponent>
                    <ChipsDirective>
                        {tags.map((tag, index) => (
                            <ChipDirective
                                key={tag}
                                text={getFirstWord(tag)}
                                cssClass={cn(
                                    index === 1
                                        ? '!bg-pink-50 !text-pink-500'
                                        : '!bg-success-50 !text-success-700',
                                )}
                            />
                        ))}
                    </ChipsDirective>
                </ChipListComponent>
            </div>
            <article className="tripCard-pill">{price}</article>
        </Link>
    );
};

export default TripCard;
