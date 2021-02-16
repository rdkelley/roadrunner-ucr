const normalizeEmail = require('normalize-email');
const db = require('../models');
const passport = require('../services/passport');

module.exports = (app) => {
  app.post('/api/users', async (req, res) => {
    const { email, password, firstName } = req.body;

    try {
      const normalEmail = normalizeEmail(email);

      const existingUsers = await db.User.findAll({
        where: { email: normalEmail },
      });

      if (existingUsers.length > 0) {
        return res.status(422).send('This user already exists');
      }

      const newUser = await db.User.create({
        email: normalEmail,
        password,
        first_name: firstName,
      });

      return res.json({
        email,
        firstName,
        id: newUser.id,
      });
    } catch (error) {
      return res.status(503).send('There was an error creating the user');
    }
  });

  app.post('/api/login', passport.authenticate('local'), (req, res) => {
    res.json({
      email: req.user.email,
      id: req.user.id,
      firstName: req.user.firstName,
    });
  });
};
