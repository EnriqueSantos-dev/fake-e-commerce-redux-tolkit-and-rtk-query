import { HiMinus, HiPlus } from 'react-icons/hi2';
import { useAppDispatch } from '~/redux/hooks';
import {
  calculateTotalPrice,
  counterQuantityItems,
  decreaseQuantity,
  deleteItem,
  increaseQuantity,
} from '~/redux/slices/cart-slice';
import { CartItem } from '~/types';
import { transformPriceToDisplayed } from '~/utils';

interface CartProductItemProps {
  product: CartItem;
}

export function CartProductItem({ product }: CartProductItemProps) {
  const dispatch = useAppDispatch();

  function handleIncreaseItem() {
    dispatch(increaseQuantity({ id: product.id }));
    dispatch(calculateTotalPrice());
  }

  function handleDecreaseItem() {
    dispatch(decreaseQuantity({ id: product.id }));
    dispatch(calculateTotalPrice());
  }

  function handleDeleteItem() {
    dispatch(deleteItem({ id: product.id }));
    dispatch(counterQuantityItems());
    dispatch(calculateTotalPrice());
  }

  return (
    <div className="flex items-center gap-5 text-zinc-900">
      <div className="flex h-16 w-16 justify-center">
        <img
          src={product.image}
          alt={product.description}
          className="h-full object-contain mix-blend-multiply"
        />
      </div>
      <div className="flex flex-col space-y-3">
        <p className="text-bold max-w-[250px] text-sm">{product.title}</p>

        <p className="font-bold">{transformPriceToDisplayed(product.price)}</p>

        <div className="flex flex-1 items-center gap-3">
          <div className="flex h-8 w-20 items-center rounded-md border border-gray-200">
            <button
              type="button"
              className="focus:ring-inset-2 h-full rounded-md px-2 text-zinc-700 focus:outline-none focus:ring-1 focus:ring-blue-200"
              onClick={handleDecreaseItem}
            >
              <HiMinus className="h-3 w-3 stroke-2" />
            </button>
            <span className="flex-1 text-center text-sm font-bold">
              {product.quantity}
            </span>
            <button
              type="button"
              className="focus:ring-inset-2 h-full rounded-md px-2 text-zinc-700 focus:outline-none focus:ring-1 focus:ring-blue-200"
              onClick={handleIncreaseItem}
            >
              <HiPlus className="h-3 w-4 stroke-2" />
            </button>
          </div>

          <button
            type="button"
            className="focus:ring-inset-2 rounded-md p-1 text-xs font-semibold text-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-200"
            onClick={handleDeleteItem}
          >
            delete
          </button>
        </div>
      </div>
    </div>
  );
}
