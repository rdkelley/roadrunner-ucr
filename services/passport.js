const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const db = require('../models');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    async (email, password, done) => {
      const dbUser = await db.User.findOne({
        where: {
          email,
        },
      });

      if (!dbUser) {
        return done(null, false, {
          message: 'Incorrect email or password.',
        });
      }

      if (!dbUser.validPassword(password, dbUser.password)) {
        return done(null, false, {
          message: 'Incorrect email or password.',
        });
      }
      return done(null, dbUser);
    }
  )
);

passport.serializeUser((user, cb) => {
  console.log('serializeUser ran');
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

module.exports = passport;
