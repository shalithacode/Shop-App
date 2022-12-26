const express = require("express");

const app = express();

app.use((req, res, next) => {
  next();
});
app.use((req, res, next) => {
  res.send("<h1>Hello</h2>");
});
app.use((req, res, next) => {});

app.listen(3000);
