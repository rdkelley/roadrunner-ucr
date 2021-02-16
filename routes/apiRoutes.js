const { Op } = require('sequelize');
const db = require('../models');

module.exports = (app) => {
  app.get('/api/shipments', async (req, res) => {
    try {
      const results = await db.Shipment.findAll({
        where: {
          [Op.or]: {
            status: ['placed', 'inTransit'],
          },
        },
      });

      return res.json(results);
    } catch (error) {
      return res.status(503).send('There was an error reading shipments.');
    }
  });

  app.get('/api/shipments/driver/:driverid?', async (req, res) => {
    if (!req.params.driverid) {
      return res.status(422).send('Driver id not included');
    }

    try {
      const results = await db.Shipment.findAll({
        where: {
          driver: req.body.driverid,
          [Op.or]: {
            status: ['placed', 'inTransit'],
          },
        },
      });

      return res.json(results);
    } catch (error) {
      return res.status(503).send('There was an error reading shipments.');
    }
  });

  app.post('/api/shipments', async (req, res) => {
    if (!req.body.street_address) {
      return res.status(422).send('Missing street address.');
    }

    if (!req.body.first_name || !req.body.last_name) {
      return res.status(422).send('Missing first or last name.');
    }

    try {
      const result = await db.Shipment.create({
        ...req.body,
        status: 'placed',
        // TODO: Add ability to add driver
        driver: 1,
      });

      return res.json({ tracking_id: result.id });
    } catch (error) {
      return res.status(503).send('There was an error adding this shipment.');
    }
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
