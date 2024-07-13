import mongoose from "mongoose";

// Define the mongoose schema for Product
const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  isFeatured: { type: Boolean, required: true, default:false },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  stock: { type: Number, required: true },
  brand: { type: String, required: true },
  sku: { type: String, required: true },
  reviews: {
    type: [{
      rating: { type: Number, required: true },
      comment: { type: String, required: true },
      date: { type: String, required: true },
      reviewerName: { type: String, required: true },
      reviewerEmail: { type: String, required: true }
    }],
    required: true
  },
  returnPolicy: { type: String, required: true },
  images: { type: [String], required: true },
  thumbnail: { type: String, required: true }
},
{
  timestamps: true
}
);

const ProductModel = mongoose.models.Product || mongoose.model('Product', productSchema)

export default ProductModel;
type Review = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};

export type Product = {
  _id?:string
  title:string
  description: string
  category: string
  isFeatured:Boolean
  price: number
  rating: number
  stock: number
  brand: string
  sku: string,
  reviews: Review[]
  returnPolicy : string
  images: string[]
  thumbnail: string
}

