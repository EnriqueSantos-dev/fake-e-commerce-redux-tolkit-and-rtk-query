import { Home, ProductDetails } from '~/pages';
import { getProduct } from '~/services/get-product';

import { createBrowserRouter, defer } from 'react-router-dom';

import { Root } from './Root';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'product/:id',
        element: <ProductDetails />,
        loader: async ({ params }) => {
          const product = getProduct(Number(params.id) as number);
          return defer({ product });
        },
        errorElement: (
          <div className='w-full flex justify-center items-center py-10'>
            <p className='text-red-500 font-semibold text-xl'>Error on loading products</p>
          </div>
        )
      },
    ],
  },
]);
