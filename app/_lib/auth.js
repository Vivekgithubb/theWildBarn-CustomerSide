import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      //this is like doing if(auth?.user)
      //                         return true
      //                    else fasle
      return !!auth?.user; //this return true if user is there ie:-loggedin else false
    },
    async signIn({ user, account, profile }) {
      try {
        const ExistingGuest = await getGuest(user.email);
        if (!ExistingGuest) {
          await createGuest({ email: user.email, fullName: user.name });
        }
        return true;
      } catch (err) {
        return false;
      }
    },
    async session({ session, user }) {
      const guest = await getGuest(session.user.email);
      session.user.guestId = guest.id;
      return session;
      // adding guest Id to session so that we can use it anywhere like getting the reservations , changing user data etc
      //this is the session we call in the pages like session = auth(), so we can get the guestId directly into that session
    },
  },
  pages: {
    signIn: "/login", //this signIn says that If someone is unauthorized, redirect them to /login. diferent from the other signIn
  },
};

export const {
  auth, // can call in any server component to get values
  signIn, // provides signIn function to like buttons, not the same as the signIn in pages
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
