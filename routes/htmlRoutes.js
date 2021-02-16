module.exports = (app) => {
  app.get('/login', (req, res) => {
    res.render('login', {});
  });

  app.get('/dashboard', (req, res) => {
    res.render('dashboard', {});
  });
};
