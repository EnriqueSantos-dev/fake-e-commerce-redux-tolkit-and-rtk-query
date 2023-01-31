/* eslint-disable react/no-array-index-key */
import { useEffect, useState } from 'react';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';

interface RatingProps {
  rating: number;
  maxRating: number;
  counterRatings: number;
}

export function Rating({ rating, maxRating, counterRatings }: RatingProps) {
  const [stars, setStars] = useState<number[]>([]);
  const isInteger = Number.isInteger(rating);
  const decimalPartOfRatingPercentage = !isInteger
    ? Number(((rating % 1) * 100).toFixed(2))
    : 0;

  useEffect(() => {
    const stars = [...new Array(Math.trunc(maxRating))]
      .fill(1)
      .map((i: number) => i * 100);

    if (!isInteger) {
      const integerPartOfRating = Math.trunc(rating);
      stars[integerPartOfRating] = decimalPartOfRatingPercentage;
      stars.fill(0, integerPartOfRating + 1, maxRating);
    }

    setStars(stars);
  }, []);

  return (
    <div className="flex w-full items-center justify-between space-x-2">
      <div className="flex items-center justify-between gap-1">
        {stars.map((star, index) => (
          <span
            key={`${star}-${index}`}
            className="relative flex h-4 w-4 items-center justify-start text-zinc-300"
          >
            {star === 0 && <BsStar className="h-full w-full" />}
            {star > 0 && star <= 50 && (
              <BsStarHalf className="h-full w-full fill-yellow-400 stroke-zinc-300" />
            )}
            {star > 50 && (
              <BsStarFill className="h-full w-full fill-yellow-400 stroke-zinc-300" />
            )}
          </span>
        ))}
      </div>

      <p className="text-xs font-medium text-zinc-900">
        {counterRatings}
        &nbsp;
        {counterRatings > 1 ? 'ratings' : 'rating'}
      </p>
    </div>
  );
}
