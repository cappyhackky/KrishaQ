import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import OrderModel from "@/lib/Models/OrderModel";

export const GET = auth(async (req: any) => {
  if (!req.auth) {
    return Response.json(
      { message: "Unauthorised to access the order/mine page" },
      { status: 401 }
    );
  }
  const user = req.auth.user;
  await dbConnect();
  const orders = await OrderModel.find({ user: user._id });
  return Response.json(orders);
});
