import { docToObj } from "@/lib/Utils/utility";
import Hero from "./Hero";
import HomeCarousel from "./HomeCarousel";
import ProductCard from "../Product/ProductCard";
import productServices from "@/lib/Services/productServices";
import { BiArrowFromLeft, BiArrowFromRight } from "react-icons/bi";
import { GoArrowRight } from "react-icons/go";
const HomeBody = async () => {
  const latestProducts = await productServices.getLatest();
  const featuredProducts = await productServices.getFeatured();
  return (
    <>
    
      {/* **************************Caraousel***************************** */}
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-7">
          <div className="lg:col-span-4 my-auto">
            <HomeCarousel />
          </div>
          <div className="lg:col-span-3 grid grid-cols-2 p-4 gap-8">
            <div className="">
              <img className="object-cover" src="/images/others/vegetable.jpg" alt="" />
              <a href="/products/category/vegetables" className="btn bg-lime-500 text-white border-0 hover:bg-lime-600 rounded-sm w-full">Vegetable Seeds</a>
            </div>
            <div className="">
              <img className="object-cover" src="/images/others/fruits.jpg" alt="" />
              <a href="/products/category/fruits" className="btn bg-lime-500 text-white border-0 hover:bg-lime-600 rounded-sm w-full">Fruit Seeds</a>
            </div>
            <div className="">
              <img className="object-cover" src="/images/others/flower.jpg" alt="" />
              <a href="/products/category/flowers" className="btn bg-lime-500 text-white border-0 hover:bg-lime-600 rounded-sm w-full">Flower Seeds</a>
            </div>
            <div className="bg-lime-300 h-full flex items-center justify-center flex-col gap-4">
              <img className="w-32 mx-auto aspect-square object-scale-down" src="/images/others/explore.png" alt="" />
              <a href="/products/category/fruits" className="flex text-xl font-bold gap-4 items-center justify-center">
              <span>Explore All</span>
              <GoArrowRight />
              </a>
              {/* <div className="btn btn-neutral rounded-sm w-full">Vegetable</div> */}
            </div>
          </div>
        </div>
        <div className="carousel carousel-end rounded-sm shadow border-4 border-lime-600">
          {latestProducts.map((product) => (
            <div className="carousel-item" key={product.sku}>
              <img
                className="aspect-square object-scale-down w-60 border"
                src={product.images[0]}
                alt="Drink"
              />
            </div>
          ))}
        </div>
        <Hero />
        {/* ********************************Card********************************** */}
        <div className="py-5 flex carousel">
          {featuredProducts.map((product) => (
            <ProductCard key={product.sku} product={docToObj(product)} />
          ))}
        </div>
      </div>
    </>
  );
};

export default HomeBody;
