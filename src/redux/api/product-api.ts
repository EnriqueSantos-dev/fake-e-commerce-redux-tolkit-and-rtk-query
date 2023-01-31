import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product } from '~/types';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
  tagTypes: ['getAllProducts', 'getProduct'],
  endpoints: (build) => ({
    getAllProducts: build.query<Product[], void>({
      query: () => '/products',
      transformResponse:
        (response: Product[]) => response.map((product) => ({ ...product, quantity: 0 })),
      providesTags: ['getAllProducts'],
    }),
    getProductById: build.query<Product, number>({
      query: (id) => `/products/${id}`,
      providesTags: ['getProduct'],
    }),
  }),
});

export const { useGetAllProductsQuery } = productApi;
