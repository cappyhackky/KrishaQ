import { cache } from "react";
import dbConnect from "../dbConnect";
import ProductModel, { Product } from "../Models/ProductModel";

export const revalidate = 3600;
const getLatest = cache(async () => {
  await dbConnect();
  const product = await ProductModel.find({}).sort({ _id: -1 }).limit(8).lean();
  return product as Product[];
});
const getFeatured = cache(async () => {
  await dbConnect();
  const product = await ProductModel.find({ isFeatured: true });
  return product as Product[];
});
const getByCategory = cache(async (category: string) => {
  await dbConnect();
  const product = await ProductModel.find({ category });
  return product as Product[];
});
const getBySku = cache(async (sku: string) => {
  await dbConnect();
  const product = await ProductModel.findOne({ sku }).lean();
  return product as Product;
});
const getByVendor = cache(async (vendor: string) => {
  // await dbConnect();
  console.log("anything");
  
  // const products = await ProductModel.find({ vendor });
  return "users"
  // return products as Product[];
});



const productServices = {
  getLatest,
  getFeatured,
  getBySku,
  getByCategory,
  getByVendor
};

export default productServices;
