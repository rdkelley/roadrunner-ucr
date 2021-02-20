const normalizeEmail = require('normalize-email');
const db = require('../models');
const passport = require('../services/passport');

module.exports = (app) => {
  app.post('/api/users', async (req, res) => {
    try {
      const { email, password, firstName } = req.body;

      const normalEmail = normalizeEmail(email);

      const existingUsers = await db.User.findAll({
        where: { email: normalEmail },
      });

      if (existingUsers.length > 0) {
        return res.status(422).send('This user already exists');
      }

      await db.User.create({
        email: normalEmail,
        password,
        firstName,
      });

      return res.json({ success: true });
    } catch (error) {
      return res
        .status(503)
        .send('Something went wrong while creating a new user.');
    }
  });

  app.post('/api/login', passport.authenticate('local'), (req, res) => {
    const { id } = req.user;

    res.json({ id });
  });
};
