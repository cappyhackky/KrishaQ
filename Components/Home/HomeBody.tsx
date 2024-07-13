import { docToObj } from '@/lib/Utils/utility'
import Hero from './Hero'
import HomeCarousel from './HomeCarousel'
import ProductCard from '../Product/ProductCard'
import productServices from '@/lib/Services/productServices'

const HomeBody = async () => {
  const latestProducts = await productServices.getLatest();
  const featuredProducts = await productServices.getFeatured();
  return (
    <>
      {/* **************************Caraousel***************************** */}
      <div className="container mx-auto">        
        <HomeCarousel />
        <div className="carousel carousel-end rounded-box shadow border border-8 border-lime-600">
          {latestProducts.map((product) => (
            <div className="carousel-item" key={product.sku}>
              <img className="aspect-square object-scale-down w-60 border" src={product.images[0]} alt="Drink" />
            </div>
          ))}
        </div>
        <Hero />
        {/* ********************************Card********************************** */}
        <div className="py-5 flex carousel">
          {featuredProducts.map((product) => (
            <ProductCard key={product.sku} product={docToObj(product)}/>
          ))}
        </div>
      </div>
    </>
  )
}

export default HomeBody