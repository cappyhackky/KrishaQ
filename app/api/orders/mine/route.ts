import dbConnect from "@/lib/dbConnect";
import OrderModel from "@/lib/Models/OrderModel";
import { ObjectId } from "mongodb";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  // console.log("Start");
  const userId  = req.nextUrl.searchParams.get('userId');
  console.log("Get the query: ",userId);
  
  if (!userId) {
    return Response.json(
      { message: "Unauthorised to access the order/mine page" },
      { status: 401 }
    );
  }
  const objectId = new ObjectId(userId);
  console.log("this is the id ",objectId);
  
  await dbConnect();
  const orders = await OrderModel.find({ user: objectId });
  return Response.json(orders);
};
