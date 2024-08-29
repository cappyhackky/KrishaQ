import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "./dbConnect";
import UserModel from "./Models/UserModel";
import bcrypt from "bcryptjs";

export const config = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        console.log("Inside Authorize");
        
        await dbConnect();
        if (credentials == null) return null;
        const user = await UserModel.findOne({ email: credentials.email });
        if (user) {
          const isMatch = await bcrypt.compare(
            credentials.password as string,
            user.password
          );
          if (isMatch) {
            return user;
          }
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/signin",
    newUser: "/register",
    error: "/signin",
  },
  callbacks: {
    authorized({ request, auth }: any) {
      const protectedPaths = [
        /\/shipping/,
        /\/payment/,
        /\/place-order/,
        /\/profile/,
        /\/order\/{.*}/,
        /\/admin/,
        /\/vendor/,
      ];
      const { pathname } = request.nextUrl;
      if (protectedPaths.some((p) => p.test(pathname))) return !!auth;
      return true;
    },
    async jwt({ user, trigger, session, token }: any) {
      console.log("Inside JWT");
      if (user) {
        console.log("before setting token", token);
        token = null
        token.user = {
          email: user.email
        };
      }
      if (trigger === "update" && session) {
        token.user = {
          email: session.user.email
        };
      }
      // console.log("After setting token: ",token);
      
      return null;
    },
    session: async ({ session, token }: any) => {
      console.log('Session: ' + session + "\nToken: " + token);
      
      if (token) {
        session.user = token.user;
      }
      console.log("Session : " + session);
      
      return null;
    },
  },
};


export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(config);
