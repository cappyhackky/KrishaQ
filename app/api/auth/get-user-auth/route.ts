import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.AUTH_SECRET;

export const GET = async (req: NextRequest) => {
  const token = req.headers.get('authorization');
  
  if (!token) {
    return Response.json({ message: "User Authentication Failed: Malformed token" });
  }

  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined. Please set AUTH_SECRET in your environment variables.');
  }

  try {
    const user = jwt.verify(token, JWT_SECRET);
    return Response.json({ user });
  } catch (error) {
    return Response.json({ message: 'Invalid token' });
  }
};
