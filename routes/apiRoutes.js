const db = require('../models');

module.exports = (app) => {
  app.get('/api/shipments', (req, res) => {
    res.json({ message: 'Hello World' });
  });

  app.post('/api/shipments', async (req, res) => {
    if (!req.body.street_address) {
      return res.status(422).send('No street address found.');
    }

    try {
      const results = await db.Shipment.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        street_address: req.body.street_address,
        priority: req.body.priority,
        // TODO: Add driver logic
        driver: 2,
        status: 'placed',
      });

      return res.json(results.id);
    } catch (error) {
      return res.status(503).send('Error adding shipment to db.');
    }
  });
};
