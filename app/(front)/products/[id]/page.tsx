import AddToCart from "@/Components/Product/AddToCart";
import productServices from "@/lib/Services/productServices";
import { docToObj } from "@/lib/Utils/utility";
import Link from "next/link";
import { BiComment, BiStar } from "react-icons/bi";
import { SlLike } from "react-icons/sl";

export const generateMetadata = async ({ params }: { params: { id: string } })=> {
  const product = await productServices.getBySku(params.id)
  if (!product) {
    return {title: "Product not found"}
  }
  return {
    title: product.title,
    description: product.description,
  }
}

const ProductDetail = async ({ params }: { params: { id: string } }) => {
  
  const product = await productServices.getBySku(params.id)
  if (!product) {
    return <div>Product Not Found </div>
  }

  return (
    <>
      <a className="btn btn-lg round ed-sm rounded-r-full bg-lime-500 border-0 text-white hover:bg-lime-600" href="/" >Home</a>
      <div className="grid md:grid-cols-4 md:gap-4">
        <div className="md:col-span-2 mx-auto">
          <img src={product.images[0]} alt={product.title} width={400} height={400} />
        </div>
        <div className="flex items-center">
          <div className="">
            <h1 className="text-4xl">{product.title}</h1>
            <div className="flex gap-2">
              <span className="text-yellow-600"><BiStar /></span>
              <span className="text-sm">{product.rating} | {product.reviews.length} Reviews</span>
            </div>
            <div className="divider"></div>
            <div className="text-4xl">₹ {product.price}</div>
            <p className="text-lg text-justify">{product.description}</p>
          </div>
        </div>
        <div className="p-4">
          <div className="card border">
            <div className="card-body">
              <div className="flex justify-between text-3xl">
                <div>Price</div>
                <div>₹ {product.price}</div>
              </div>
              <div className="flex justify-between text-xl">
                <div>Status</div>
                <div>{product.stock > 0 ? 'Available' : 'Out of Stock'}</div>
              </div>
              <div className="card-actions">
                <AddToCart item={{ ...docToObj(product) ,qty: 0 }} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="container mx-auto p-8 md:p-16 md:px-32">
        {product.reviews.length > 0 ?
          <>
            {product.reviews.map((review, i) => (
              <div key={i} className="card shadow m-3">
                <div className="card-body">
                  <div className="card-title flex justify-between">
                    <h2>{review.reviewerName}</h2>
                    <div className="flex gap-2">
                      <span className="text-lime-600"><BiStar /></span>
                      <span className="text-sm">{review.rating}</span>
                    </div>
                  </div>
                  <p>{review.reviewerEmail}</p>
                  <p className="flex"><span className="p-1"><BiComment /></span>{review.comment}</p>
                  <div className="card-actions text-sky-600 justify-end">
                    Like <span className="p-1"><SlLike /></span>
                  </div>
                </div>
              </div>
            ))}
          </> :
          <div className="text-4xl mx-auto">No reviews yet!</div>
        }
        <div className="card shadow-xl lg:w-1/2 mt-8">
          <div className="card-body">
            <textarea name="comment" id="" className="textarea text-xl rounded bg-stone-50 p-3 shadow w-full mt-3" placeholder="Add a review" rows={3}></textarea>
            <div className="card-actions justify-end">
              <button className="btn bg-lime-600 text-white rounded text-md border-0 text-lg font-light w-1/3">Add Review</button>
            </div>
          </div>
        </div>
      </div> */}

    </>
  )
}

export default ProductDetail