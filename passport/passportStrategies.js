import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import passport from "passport";
// Auth JWT
passport.use(
  "JWT",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_JWT,
    },
    async (jwt_payload, done) => {
      if (!jwt_payload.id) {
        const response = {
          error: true,
          message: "Token inválido.",
        };
        done(false, response);
      }
      done(null, jwt_payload);
    }
  )
);
