import dbConnect from "@/lib/dbConnect";
import OrderModel from "@/lib/Models/OrderModel";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const vendorId = req.nextUrl.searchParams.get('vendor');
  if (!vendorId) {
    return NextResponse.json(
      { message: "Unauthorized to access the order/mine page" },
      { status: 401 }
    );
  }

  const objectId = new ObjectId(vendorId);
  await dbConnect();
  const orders = await OrderModel.find({ "items.vendor": objectId }).lean();


  const orderSummary = await OrderModel.aggregate([
    {
      $match: {
        "items.vendor": objectId,
      },
    },
    {
      $group: {
        _id: "$isDelivered",
        totalOrders: { $sum: 1 },
        totalAmount: { $sum: "$totalPrice" },
      },
    },
  ]);

  let pendingOrders = 0;
  let completedOrders = 0;
  let totalPendingAmount = 0;
  let totalCompletedAmount = 0;

  orderSummary.forEach((order) => {
    if (!order._id) {
      pendingOrders = order.totalOrders;
      totalPendingAmount = order.totalAmount;
    } else {
      completedOrders = order.totalOrders;
      totalCompletedAmount = order.totalAmount;
    }
  });

  return NextResponse.json({
    summary: {
      pendingOrders,
      completedOrders,
      totalPendingAmount,
      totalCompletedAmount
    },
    orders
  });
};
