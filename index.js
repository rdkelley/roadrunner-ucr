const express = require('express');

const db = require('./models');

const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

db.sequelize.sync({ force: true }).then(() => {
  db.Shipment.create({
    first_name: 'Ryan',
    last_name: 'Kelley',
    street_address: '555 Some Road, Los Angleles, CA 91000',
    status: 'placed',
    priority: false,
    driver: 2,
  });
  // eslint-disable-next-line no-console
  app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
});
