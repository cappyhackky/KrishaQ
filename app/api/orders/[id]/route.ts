import dbConnect from "@/lib/dbConnect";
import OrderModel from "@/lib/Models/OrderModel";

export const GET = async (...request: any) => {
  const [req, { params }] = request;
  await dbConnect();
  const order = await OrderModel.findById(params.id)
  return Response.json(order)
};
