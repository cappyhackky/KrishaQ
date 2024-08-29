import dbConnect from "@/lib/dbConnect";
import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import UserModel from "@/lib/Models/UserModel";
export const POST = async (request: NextRequest) => {
  const { name, email, password, role, encImg, pan_no, address, phone_no } = await request.json();
  console.log(name, email, password, role, pan_no, address, phone_no);
  
  await dbConnect();
  const hashedPassword = await bcrypt.hash(password, 5);
  const newUser = new UserModel({ name, email, password: hashedPassword, phone_no, role, image:encImg });
  console.log(newUser);
  
  if (role === "vendor") {
    if ( !address || !pan_no ) {
      return new Response(JSON.stringify({ message: "Vendor registration requires address, and PAN No." }), { status: 400 });
    }
    newUser.address = address;
    newUser.pan_no = pan_no;
  }
  try {
    await newUser.save();
    return Response.json( { message: "User Registered Successfully!" }, { status: 201 } );
  } catch (err: any) {
    return Response.json({ message: `error ${err.message}` }, { status: 500 });
  }
};

export const PUT = async (request: NextRequest) => {
  try {
    const { _id, update } = await request.json();
    console.log(_id);
    
    
    if (!_id || !update) {
      return new Response(JSON.stringify({ message: "User ID and update data are required" }), { status: 400 });
    }
    await dbConnect();
    const updatedUserData = await UserModel.findByIdAndUpdate(_id, update, { new: true });
    if (!updatedUserData) {
      return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
    }
    return new Response(JSON.stringify({ message: "User updated successfully!", updatedUserData }), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ message: `Error: ${err.message}` }), { status: 500 });
  }
};

