import * as Popover from '@radix-ui/react-popover';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useAppSelector } from '~/redux/hooks/hooks';
import { transformPriceToDisplayed } from '~/utils';
import { CartProductItem } from './CartProductItem';

export function Cart() {
  const { items, quantityItems, totalPrice } = useAppSelector(
    (state) => state.cart,
  );

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          type="button"
          className="relative h-9 cursor-pointer rounded-md bg-gray-100 px-2 py-1 text-zinc-700 shadow-md disabled:cursor-not-allowed disabled:opacity-70"
          disabled={quantityItems === 0}
        >
          <AiOutlineShoppingCart className="h-6 w-6 stroke-2" />

          {quantityItems > 0 && (
            <span className="absolute -top-2 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-zinc-700 text-[10px] font-bold text-white">
              {quantityItems}
            </span>
          )}
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content className="top-3 right-2 space-y-4 rounded-lg border border-gray-200 bg-gray-50 shadow-lg focus:outline-none focus:ring-1 focus:ring-gray-300 focus:ring-offset-2 focus:ring-offset-gray-100">
          <div className="max-h-96 w-full space-y-4 overflow-auto p-6">
            {items.map((item) => (
              <CartProductItem key={item.id} product={item} />
            ))}
          </div>

          <div className="w-full border-t border-gray-300 p-6">
            <strong className="text-lg">
              {transformPriceToDisplayed(totalPrice)}
            </strong>

            <button
              type="button"
              className="mt-3 h-10 w-full rounded bg-red-500 font-bold text-white transition-colors hover:bg-red-600 focus:bg-red-600 focus:outline-none focus:ring-1 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-50"
            >
              checkout
            </button>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
