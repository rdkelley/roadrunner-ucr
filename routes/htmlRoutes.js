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
    res.render('dashboard', {});
  });
};
