import { cn, getFirstWord } from '@/utils/misc';
import Link from 'next/link';
import { Badge } from './ui/badge';
// import { usePathname } from 'next/navigation';

const TripCard = ({
    id,
    imageUrl,
    location,
    name,
    price,
    tags,
}: TripCardProps) => {
    // const pathName = usePathname();
    return (
        <Link
            href={
                // pathName === '/' || pathName.startsWith('/travel')
                //     ? `/travel/${id}`:
                `/trip/${id}`
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
                {tags.map((tag, index) => (
                    <Badge
                        key={tag}
                        className={cn(
                            index === 1
                                ? '!bg-pink-50 !text-pink-500'
                                : '!bg-success-50 !text-success-700',
                        )}>
                        {getFirstWord(tag)}
                    </Badge>
                ))}
            </div>
            <article className="tripCard-pill">{price}</article>
        </Link>
    );
};

export default TripCard;
