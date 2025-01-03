import { Brands } from "../components/home/Brands"
import { FeaturedGrid } from "../components/home/FeaturedGrid"
import { ProductGrid } from "../components/home/ProductGrid"
import { popularCelulares, recentCelulares } from "../data/initialData"
import { prepareProducts } from "../helpers"

export const HomePage = () => {

  const preparedRecentProducts = prepareProducts(recentCelulares)
  const preparedPopularProducts = prepareProducts(popularCelulares)

  return (
    <div>
      <FeaturedGrid />

      <ProductGrid 
      title='nuevos productos'
      products={preparedRecentProducts}
      />
      <ProductGrid 
      title='productos destacados'
      products={preparedPopularProducts}
      />

      <Brands />
    </div>
  )
}
