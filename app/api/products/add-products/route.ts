import dbConnect from "@/lib/dbConnect";
import { NextRequest } from "next/server";
import ProductModel from '@/lib/Models/ProductModel';
const generateSKU = (): string => {
  const length = 8;
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let sku = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    sku += characters[randomIndex];
  }

  return sku;
};
const generateUniqueSKU = async (): Promise<string> => {
  let sku:string = '';
  let isUnique = false;

  while (!isUnique) {
    sku = generateSKU();
    const existingProduct = await ProductModel.findOne({ sku }).lean();

    if (!existingProduct) {
      isUnique = true;
    }
  }
  return sku;
};
export const POST = async (request: NextRequest) => {
  await dbConnect();
  if (request.method === 'POST') {
    try {
      const {title, description, category, price, stock, images, vendor} = await request.json()
      const sku = await generateUniqueSKU()
      const product = new ProductModel({title, description, category, price, stock, images, sku, vendor});
      const savedProduct = await product.save();
      console.log('Saved Product:', savedProduct);
      return Response.json({ product: savedProduct }, { status: 201 });
    } catch (error : any) {
        return Response.json({ message: error.message }, { status: 500 });
    }
  } else {
    return Response.json({ message: "Method not allowed" }, { status: 405 });
  }
};
