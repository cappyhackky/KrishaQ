import dbConnect from "@/lib/dbConnect";
import OrderModel, { OrderItem } from "@/lib/Models/OrderModel";
import ProductModel from "@/lib/Models/ProductModel";
import { round2 } from "@/lib/Utils/utility";

const calcPrice = (orderItems: OrderItem[]) => {
  const itemsPrice = round2(
    orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  const shippingPrice = round2(itemsPrice > 100 ? 0 : 40);
  const taxPrice = round2(Number(0.15 * itemsPrice));
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);
  return { itemsPrice, shippingPrice, taxPrice, totalPrice };
};

export const POST = async (req: any) => {
  try {
    
    const payload = await req.json();
    console.log(payload);
    
    if (!payload.user) {
      return Response.json({ message: "Unauthorised Access" }, { status: 401 });
    }

    await dbConnect();
    const dbProductPrices = await ProductModel.find(
      {
        _id: { $in: payload.items.map((x: { _id: string }) => x._id) },
      },
      "price"
    );
    const dbOrderItems = payload.items.map(
      (x: { _id: string; images: string[]; title: string }) => ({
        ...x,
        product: x._id,
        name: x.title,
        price: dbProductPrices.find((x) => x._id === x._id).price,
        _id: undefined,
        image: x.images[0],
      })
    );

    const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
      calcPrice(dbOrderItems);
    const newOrder = new OrderModel({
      items: dbOrderItems,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      shippingAddress: payload.shippingAddress,
      paymentMethod: payload.paymentMethod,
      user: payload.user,
    });
    const createOrder = await newOrder.save();
    return Response.json(
      { message: "Order has been created!" },
      { status: 201 }
    );
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 500 });
  }
};
