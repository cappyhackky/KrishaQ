import dbConnect from "@/lib/dbConnect";
import { NextRequest } from "next/server";
import UserModel from "@/lib/Models/UserModel";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

export const POST = async (request: NextRequest) => {
  const {  email, password } = await request.json();
  const JWT_SECRET = process.env.AUTH_SECRET
  await dbConnect();
  if (email == null || password == null) return null;
  try {
    console.log(email);
    
        const user = await UserModel.findOne({ email: email });
        if (!user) {
        return Response.json({ message: 'User not found!!!' }, { status: 404 });
        }
        const isMatch = await bcrypt.compare( password as string, user.password );
        if (!isMatch) {
          return Response.json({ message: 'Invalid e-mail or password' }, { status: 404 });
        }
        console.log(user);
        
        const userData = {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone_no: user.phone_no,
          role: user.role,
          address: user.address,
          pan_no: user.pan_no,
          storeName: user.storeName
        }
        if (!JWT_SECRET) {
          throw new Error('JWT_SECRET is not defined. Please set AUTH_SECRET in your environment variables.');
        }
        const jwtToken = jwt.sign(userData , JWT_SECRET)
        return Response.json(
            { message: "Signed in Successfully!",jwtToken, userProfile:user.image },
            { status: 200 }
          );
    
  } catch (err: any) {
    return Response.json({ message: err.message }, { status: 500 });
  }
};