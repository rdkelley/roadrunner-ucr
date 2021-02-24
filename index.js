const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const passport = require('./services/passport');

const db = require('./models');

const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: 'some random string thats needs to be a secret',
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(express.static('public'));

app.use(passport.initialize());
app.use(passport.session());

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

require('./routes/authRoutes')(app);
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

db.sequelize.sync({}).then(() => {
  // eslint-disable-next-line no-console
  app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
});
