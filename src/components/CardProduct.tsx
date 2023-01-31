import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '~/redux/hooks/hooks';
import {
  addToCart,
  calculateTotalPrice,
  counterQuantityItems,
} from '~/redux/slices/cart-slice';
import { Product } from '~/types';
import { transformPriceToDisplayed } from '~/utils';
import { Rating } from './Rating';

interface CardProductProps {
  product: Product;
}

export function CardProduct({ product }: CardProductProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleClick() {
    dispatch(addToCart(product));
    dispatch(counterQuantityItems());
    dispatch(calculateTotalPrice());
  }

  function handleNavigateToProductDetails() {
    navigate(`/product/${product.id}`, { preventScrollReset: true });
  }

  return (
    <div className="mx-auto flex w-full max-w-xs flex-col rounded-lg bg-gray-50 px-6 py-8 shadow-lg transition-transform duration-200 hover:scale-105">
      <div className="relative flex h-56 items-center justify-center overflow-hidden">
        <img
          src={product.image}
          alt={product.description}
          loading="lazy"
          className="h-full max-w-full object-contain mix-blend-multiply"
        />
      </div>
      <p className="mt-3 flex-1 text-zinc-900">{product.title}</p>

      <div className="my-2 flex items-center justify-between">
        <Rating
          rating={product.rating.rate}
          maxRating={5}
          counterRatings={product.rating.count}
        />
      </div>

      <p className="mt-2 text-xl font-bold">
        {transformPriceToDisplayed(product.price)}
      </p>
      <div className="mt-4 flex items-center gap-3">
        <button
          type="button"
          className="h-10 w-full flex-1 rounded-full bg-green-600 text-sm font-bold uppercase text-white transition-colors hover:bg-green-700 focus:bg-green-600 focus:outline-none"
          onClick={handleClick}
        >
          Add to cart
        </button>

        <button
          type="button"
          title="view product details"
          className="rounded-md border border-gray-300 px-2 py-1 text-zinc-600 transition-opacity hover:opacity-90"
          onClick={handleNavigateToProductDetails}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
