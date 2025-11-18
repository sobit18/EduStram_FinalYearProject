import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      accessType: "online",  // no refresh token
      prompt: "consent",
    },
    async (accessToken, _, profile, done) => { // ignore refreshToken
      console.log("ACCESS TOKEN:", accessToken);
      const user = {
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        tokens: { accessToken }, // only accessToken
      };
      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
