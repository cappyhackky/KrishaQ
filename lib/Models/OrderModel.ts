import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: { type: String, required: true },
        sku: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        vendor: { 
          type: mongoose.Schema.Types.ObjectId, 
          ref: 'User', 
          required: true 
        },
      },
    ],
    shippingAddress: {
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      pinCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: { type: String, required: true },
    paymentResult: { id: String, status: String, email_address: String },
    itemsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, required: true, default:false },
    isDelivered: { type: Boolean, required: true, default:false},
    paidAt: { type: Date },
    deliveredAt: { type: Date },
    createdAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

const OrderModel =
  mongoose.models.Order || mongoose.model("Order", orderSchema);

export default OrderModel;

export type Order = {
  _id: string;
  user?: { name: string };
  items: [OrderItem];
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    pinCode: string;
    country: string;
  };
  paymentMethod: string;
  paymentResult?: { id: string; status: string; email_address: string };
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
  deliveredAt?: string;
  createdAt: string;
};

export type OrderItem = {
  _id: string;
  sku: string;
  title: string;
  qty: number;
  images: string[];
  price: number;
  vendor:string;
};

export type ShippingAddress = {
  fullName: string;
  address: string;
  city: string;
  pinCode: string;
  country: string;
};
