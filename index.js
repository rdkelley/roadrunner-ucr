const express = require('express');
const exphbs = require('express-handlebars');

const db = require('./models');

const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

db.sequelize.sync().then(() => {
  // eslint-disable-next-line no-console
  app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
});
