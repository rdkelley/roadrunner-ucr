const isAuth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect(401, '/login');
  }

  return next();
};

module.exports = (app) => {
  app.get('/login', (req, res) => {
    res.render('login', {});
  });

  app.get('/dashboard', isAuth, (req, res) => {
    res.render('dashboard', {
      firstName: req.user.firstName,
      shipments: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    });
  });
};
