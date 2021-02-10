const express = require('express');

const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App is listening on PORT ${PORT}`);
});