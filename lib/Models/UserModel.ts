import mongoose from "mongoose";

export type user = {
  _id:string;
  name: string;
  email: string;
  password: string;
  phone_no?: string;
  role: 'customer' | 'vendor' | 'admin';
  image: string;
  storeName?: string;
  address?: string;
  pan_no?: string;
}

const UserSchema = new mongoose.Schema(
  {
    name:{
      type: String,
      required: true,
    },
    email:{
      type: String,
      required: true,
      unique: true
    },
    password : {
      type: String,
      required: true
    },
    phone_no : {
      type: String,
      required: true
    },
    role:{
      type:String,
      enum: ['user', 'vendor', 'admin'],
      required:true,
      default:'user'
    },
    image:{
      type:String,
      required:true,
      default:'/images/others/dummy_user.png'
    },
    address: { 
      type: String, 
      required: function (this: user) { return this.role === 'vendor'; }
    },
    pan_no: { 
      type: String, 
      required: function( this: user ) { return this.role === 'vendor'; }
    },
  },
  {
    timestamps: true,
  }
)

const UserModel = mongoose.models?.User || mongoose.model("User", UserSchema)
export default UserModel;