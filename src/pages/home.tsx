import { CardProduct, SkeletonCardProducts } from '~/components';
import { useGetAllProductsQuery } from '~/redux/api/product-api';

export function Home() {
  const { data, isLoading } = useGetAllProductsQuery();

  return (
    <div className="container mx-auto py-12">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,350px))] place-content-center gap-y-6 gap-x-4">
        {isLoading ? (
          <SkeletonCardProducts />
        ) : (
          data?.map((product) => (
            <CardProduct key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
}
