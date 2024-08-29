import dbConnect from "@/lib/dbConnect";
import ProductModel from "@/lib/Models/ProductModel";
import { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  await dbConnect();
  if (request.method === 'POST') {
    try {
      const { vendor } = await request.json()
      if (!vendor) {
        return Response.json({ message: "Vendor parameter is required" }, { status: 400 });
      }
      const products = await ProductModel.find({ vendor });
      return Response.json({ products }, { status: 201 });
    } catch (error: any) {
      return Response.json({ message: error.message }, { status: 500 });
    }
  } else {
    return Response.json({ message: "Method not allowed" }, { status: 405 });
  }
};

export const DELETE = async (request: NextRequest) => {
  await dbConnect();
  try {
    const { _id } = await request.json();
    if (!_id) {
      return Response.json({ message: "Product ID is required" }, { status: 400 });
    }
    const deletedProduct = await ProductModel.findByIdAndDelete( _id );
    if (!deletedProduct) {
      return Response.json({ message: "Product not found" }, { status: 404 });
    }
    return Response.json({ message: "Product deleted successfully" }, { status: 200 });
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 500 });
  }
};

export const PUT = async (request: NextRequest) => {
  await dbConnect();
  try {
    const { _id, update } = await request.json();
    
    if (!_id || !update) {
      return Response.json({ message: "Product ID and update data are required" }, { status: 400 });
    }
    const updatedProduct = await ProductModel.findByIdAndUpdate(_id, update, { new: true });
    if (!updatedProduct) {
      return Response.json({ message: "Product not found" }, { status: 404 });
    }
    return Response.json({ product: updatedProduct }, { status: 200 });
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 500 });
  }
};
