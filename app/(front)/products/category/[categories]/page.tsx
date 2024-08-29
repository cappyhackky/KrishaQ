import ProductCard from "@/Components/Product/ProductCard";
import productServices from "@/lib/Services/productServices";
import { docToObj } from "@/lib/Utils/utility";

export const generateMetadata = ({
  params,
}: {
  params: { categories: string };
}) => {
  return { title: `Product - ${params.categories.toUpperCase()}` };
};

const ProductCategory = async ({
  params,
}: {
  params: { categories: string };
}) => {
  const products = await productServices.getByCategory(params.categories);
  if (!products) return <span className="loading loading-spinner"></span>;
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-6 m-0">
        <div className="col-span-1 hidden lg:block">
          <ul className="mt-12 ps-4">
            <li className={`p-4 ${params.categories === 'fruits' && 'border-l-4 bg-lime-500 text-white shadow-inner border-lime-900'}`}>
              <a href="/products/category/fruits">Fruit Seeds</a>
            </li>
            <li className={`p-4 ${params.categories === 'vegetables' && 'border-l-4 bg-lime-500 text-white shadow-inner border-lime-900'}`}>
              <a href="/products/category/vegetables">Vegetable Seeds</a>
            </li>
            <li className={`p-4 ${params.categories === 'flowers' && 'border-l-4 bg-lime-500 text-white shadow-inner border-lime-900'}`}>
              <a href="/products/category/flowers">Flower Seeds</a>
            </li>
          </ul>
        </div>
        <div className="md:col-span-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mx-auto">
          {products.map((product) => (
            <div key={product.sku}>
              <ProductCard product={docToObj(product)} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductCategory;
