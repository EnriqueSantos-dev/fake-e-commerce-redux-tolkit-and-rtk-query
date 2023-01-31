import { Suspense, useState } from 'react';
import { HiMinus, HiPlus } from 'react-icons/hi2';
import { Await, useLoaderData } from 'react-router-dom';
import { useAppDispatch } from '~/redux/hooks';
import {
  addToCart,
  calculateTotalPrice,
  counterQuantityItems,
} from '~/redux/slices/cart-slice';
import { Product } from '~/types';
import { transformPriceToDisplayed } from '~/utils';

export function ProductDetails() {
  const data = useLoaderData() as { product: Product };
  const dispatch = useAppDispatch();
  const [counter, setCounter] = useState(1);

  function handleCounterIncrease() {
    setCounter((prev) => prev + 1);
  }

  function handleCounterDecrease() {
    setCounter((prev) => (prev > 1 ? prev - 1 : prev));
  }

  function handleAddProductToCart(product: Product) {
    dispatch(addToCart({ ...product, quantity: counter }));
    dispatch(calculateTotalPrice());
    dispatch(counterQuantityItems());
  }

  return (
    <Suspense
      fallback={
        <div className="w-full py-20 text-center">
          <div role="status">
            <svg
              aria-hidden="true"
              className="mr-2 inline h-8 w-8 animate-spin fill-blue-600 text-gray-200"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      }
    >
      <Await resolve={data.product}>
        {(product: Product) => (
          <div
            className="container mx-auto grid grid-cols-1 gap-8 py-12 lg:grid-cols-2 lg:gap-0
          "
          >
            <section className="flex aspect-square max-h-[450px] w-full items-center justify-center md:items-start">
              <img
                src={product.image}
                alt={product.description}
                className="h-full w-full object-contain mix-blend-darken"
              />
            </section>
            <section className="w-full">
              <h1 className="text-2xl font-bold">{product.title}</h1>
              <p className="mt-8 text-left text-sm text-zinc-700 xl:max-w-lg">
                {product.description}
              </p>

              <p className="mt-6 text-2xl font-bold">
                {transformPriceToDisplayed(product.price)}
              </p>

              <div className="mt-8 flex flex-col items-start justify-start gap-4">
                <button
                  type="button"
                  className="h-10 rounded-md bg-red-500 px-8 font-bold text-white transition-colors
                    hover:bg-red-600 focus:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Buy now
                </button>
                <div className="flex items-stretch gap-3">
                  <div className="w-fit">
                    <div className="flex h-full w-full items-center rounded-md border border-gray-200">
                      <button
                        type="button"
                        className="h-full rounded-md px-3 text-zinc-700 focus:outline-none focus:ring-1 focus:ring-blue-200"
                        onClick={handleCounterDecrease}
                      >
                        <HiMinus className="h-3 w-3 stroke-2" />
                      </button>
                      <span className="px-2 text-center text-sm font-bold">
                        {counter}
                      </span>
                      <button
                        type="button"
                        className="h-full rounded-md px-3 text-zinc-700 focus:outline-none focus:ring-1 focus:ring-blue-200"
                        onClick={handleCounterIncrease}
                      >
                        <HiPlus className="h-3 w-4 stroke-2" />
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="h-10 whitespace-nowrap rounded-md border border-zinc-300 px-4 font-bold text-zinc-600 transition-opacity hover:opacity-70"
                    onClick={() => handleAddProductToCart(product)}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}
      </Await>
    </Suspense>
  );
}
