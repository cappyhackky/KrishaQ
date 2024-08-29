import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.AUTH_SECRET

const getUserData = (token: any) => {
  console.log("This is the key", SECRET_KEY);
  
  const userDataDecoded = jwt.verify(token, SECRET_KEY);
  // console.log(userDataDecoded);
  
  return userDataDecoded;
};

export default getUserData;
