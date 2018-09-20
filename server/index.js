const app = require('./culletons.js');

app.listen(process.env.PORT, function () {
  console.log(`listening on port ${process.env.PORT}!`);
});