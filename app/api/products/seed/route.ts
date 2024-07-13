import ProductModel from "@/lib/Models/ProductModel";
import UserModel from "@/lib/Models/UserModel";
import data from "@/lib/data";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(request:NextRequest) =>{
  const {users, products} = data;
  await dbConnect()
  
  await UserModel.deleteMany()
  await UserModel.insertMany(users)

  await ProductModel.deleteMany()
  await ProductModel.insertMany(products)

  return NextResponse.json({
    message: "Data seeded Successfully",
    users,
    products
  })
}