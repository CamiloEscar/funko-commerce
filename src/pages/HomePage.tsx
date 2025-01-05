import { Brands } from "../components/home/Brands";
import { FeaturedGrid } from "../components/home/FeaturedGrid";
import { ProductGrid } from "../components/home/ProductGrid";
import { ProductGridSkeleton } from "../components/skeletons/ProductGridSkeleton";
import { prepareProducts } from "../helpers";
import { useHomeProducts } from "../hooks";

export const HomePage = () => {
  const { recentProducts, popularProducts, isLoading } = useHomeProducts();
  const preparedRecentProducts = prepareProducts(recentProducts);
  const preparedPopularProducts = prepareProducts(popularProducts);

  return (
    <div>
      <FeaturedGrid />

      {isLoading ? (
        <ProductGridSkeleton numberOfProducts={4} />
      ) : (
        <ProductGrid
          title="nuevos productos"
          products={preparedRecentProducts}
        />
      )}

      {isLoading ? (
        <ProductGridSkeleton numberOfProducts={4} />
      ) : (
        <ProductGrid
          title="productos destacados"
          products={preparedPopularProducts}
        />
      )}

      <Brands />
    </div>
  );
};
