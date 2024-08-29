import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  isFeatured: { type: Boolean, required: true, default:false },
  price: { type: Number, required: true },
  rating: { type: Number, required: true, default:0 },
  stock: { type: Number, required: true },
  sku: { type: String, required: true },
  reviews: {
    type: [{
      rating: { type: Number, required: true },
      comment: { type: String, required: true },
      date: { type: String, required: true },
      reviewerName: { type: String, required: true },
      reviewerEmail: { type: String, required: true }
    }],
    required: false
  },
  images: { type: [String], required: true },
  vendor: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }
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
  sku: string
  reviews: Review[]
  images: string[]
  thumbnail: string
  vendor:string
}

