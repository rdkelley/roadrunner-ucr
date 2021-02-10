module.exports = (app) => {
  app.get('/api/shipments', (req, res) => {
    res.json({ message: 'Hello World' });
  });
};
