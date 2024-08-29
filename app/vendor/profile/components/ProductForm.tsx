import { AuthContext } from '@/lib/Providers/AuthProvider';
import { useContext, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
type Inputs = {
  title: string,
  description: string,
  category: string,
  price: number,
  rating: number,
  stock: number,
  images: string[]
};
const ProductForm = ({ deactivate, updateProducts, isEdit, product }) => {
  const { user } = useContext(AuthContext) as any;
  const [encodedImage, setEncodedImage] = useState<string | null>(isEdit && product ? product.images[0] : null);
  const { register, handleSubmit, getValues, reset, formState: { errors, isSubmitting } } = useForm<Inputs>({
    // defaultValues: {
    //   title: '',
    //   description: '',
    //   category: '',
    //   price: 0,
    //   stock: 0,
    //   images: []
    // },
    defaultValues: isEdit && product ? {
      title: product.title,
      description: product.description,
      category: product.category,
      price: product.price,
      stock: product.stock,
      images: product.images,
    } : {
      title: '',
      description: '',
      category: '',
      price: 0,
      stock: 0,
      images: []
    },
  });
  const handleProfileUpload = async () => {
    const profile = document.getElementById("productImage")?.files[0];
    const profileEncoded = await toBase64(profile);
    setEncodedImage(profileEncoded);
  };
  const toBase64 = (file: any) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const formSubmit: SubmitHandler<Inputs> = async (form) => {
    const { title, description, category, price, stock } = form;

    if (isEdit) {
      console.log(user._id);

      try {
        const response = await fetch('/api/products/vendor-products', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ _id: product._id, update: { title, description, price, stock, images: [encodedImage] } }),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        updateProducts(data.product);
        deactivate(false);
        toast.success("Product updated successfully!");
      } catch (error) {
        console.error('Failed to update product:', error);
      }

    } else {
      try {
        if (!encodedImage) {
          toast.error("Upload the image!")
          return
        }
        const res = await fetch("/api/products/add-products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, description, category, price, stock, images: [encodedImage], vendor: user._id }),
        });
        if (res.ok) {
          const data = await res.json();
          console.log(data);
          updateProducts(data.product);
          reset()
          toast.success("New Product Added successfully!");
        } else {
          const data = await res.json();
          throw new Error(data.message);
        }
      } catch (err: any) {
        toast.error(err || "Some error occured!");
      }
    }
  }
  return (
    <>
      <div className="flex flex-col md:flex-row-reverse">
        {/* {JSON.stringify(product)} */}
        <div className="md:w-1/3 flex justify-center items-center p-4">
          {encodedImage ? <img src={encodedImage} alt="encodedImage" /> : <img src={isEdit && product ? product.images[0] : "https://placehold.jp/300x300.png"} alt="dummy_user" />}
        </div>
        <form onSubmit={handleSubmit(formSubmit)} className="md:w-2/3 p-4">
          <div className="my-2">
            <label htmlFor="name" className="label">Product Name</label>
            <input type="text" className="input rounded-sm input-bordered w-full"{...register("title", { required: "Name is required", })} />
            {errors.title?.message && (<div className="text-error">{errors.title.message}</div>)}
          </div>
          <div className="my-2">
            <label htmlFor="category" className="label">Category</label>
            <select disabled={isEdit} className="input rounded-sm input-bordered w-full" {...register("category", { required: "Category is required", })}>
              <option value="">Select a Category</option>
              <option value="fruits">Fruits Seeds</option>
              <option value="vegetables">Vegetables Seeds</option>
              <option value="flowers">Flower Seeds</option>
            </select>
            {errors.category?.message && (<div className="text-error">{errors.category.message}</div>)}
          </div>
          <div className="my-2 flex gap-2 w-full">
            <div className="w-1/2">
              <label htmlFor="price" className="label">Price</label>
              <input type="text" className="input rounded-sm input-bordered w-full"{...register("price", { required: "Price is required", })} />
              {errors.price?.message && (<div className="text-error">{errors.price.message}</div>)}
            </div>
            <div className="w-1/2">
              <label htmlFor="stock" className="label">Stock</label>
              <input type="text" className="input rounded-sm input-bordered w-full"{...register("stock", { required: "Stock unit is required", })} />
              {errors.stock?.message && (<div className="text-error">{errors.stock.message}</div>)}
            </div>
          </div>
          <div className="my-2">
            <label htmlFor="image" className="label">Product Image</label>
            <div className="join flex">
              <input id="productImage" type="file" accept="image/*" className="file-input file-input-ghost join-item rounded-sm input-bordered w-full"
                {...register("images", {
                  required: !isEdit ? "Product Image is required" : undefined,
                  validate: (value) => {
                    if (!isEdit && (!value || value.length === 0)) {
                      return "Product Image is required";
                    }
                    return true;
                  },
                })}
              />
                {/* // {...register("images", { required: isEdit ?? "Product Image is required", })} /> */}
              <div className="join-item btn bg-lime-500 hover:bg-lime-600 text-white border-0 rounded-sm px-10" onClick={handleProfileUpload}>Upload</div>
            </div>
            {errors.images?.message && (<div className="text-error">{errors.images.message}</div>)}
          </div>
          <div className="my-2 col-span-2">
            <label htmlFor="description" className="label">Description</label>
            <textarea className="textarea rounded-sm textarea-bordered w-full"{...register("description", { required: "Price is required", })} />
            {errors.description?.message && (<div className="text-error">{errors.description.message}</div>)}
          </div>
          <div className="my-4 grid grid-cols-2 gap-4 text-start">
            <button className="btn text-lime-500 border border-lime-500 bg-white hover:bg-lime-600 hover:text-white rounded-sm w-full" onClick={() => { deactivate(false) }}>Go Back</button>
            <button className="btn bg-lime-500 border-0 text-white hover:bg-lime-600 rounded-sm w-full" type="submit" disabled={isSubmitting}>{isSubmitting && (<span className="loading loading-spinner"></span>)}{isEdit ? "Update Product" : "Add Product"}</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default ProductForm;