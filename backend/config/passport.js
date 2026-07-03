const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.SERVER_URL}/api/auth/google/callback`,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value.toLowerCase();
        const state = req.query.state;

        let user = await User.findOne({ email });

        if (user) {
          if (user.oauth_provider === "local") {
            user.oauth_provider = "google";
            user.oauth_id = profile.id;
            user.is_verified = true;
          }
          // Sinkron foto Google tiap login, KECUALI user udah pernah upload foto sendiri
          if (!user.avatar_is_custom && profile.photos[0]?.value) {
            user.avatar_url = profile.photos[0].value;
          }
          if (user.isModified()) await user.save();
          user._isNewUser = false;
          return done(null, user);
        }

        if (state === "login") {
          const dummyUser = { _isNewUser: true };
          return done(null, dummyUser);
        }

        user = await User.create({
          first_name: profile.name.givenName || profile.displayName,
          last_name: profile.name.familyName || "",
          email,
          role: "food_seeker",
          oauth_provider: "google",
          oauth_id: profile.id,
          avatar_url: profile.photos[0]?.value,
          is_verified: true,
          is_active: true,
          is_profile_complete: false,
          profile: {},
        });
        user._isNewUser = false;
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    },
  ),
);

module.exports = passport;
