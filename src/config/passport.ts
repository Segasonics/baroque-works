import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User";
import dotenv from "dotenv";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "https://baroque-works.onrender.com/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        let user = await User.findOneAndUpdate({ googleId: profile.id });
        if (user) {
          return cb(null, user);
        }
        user = await User.create({
          name: profile.displayName ?? "",
          email: profile.emails?.[0]?.value ?? "",
          googleId: profile.id ?? "",
        });
        return cb(null, user);
      } catch (error) {
        return cb(error);
      }
    },
  ),
);
