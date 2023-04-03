const express = require("express");
const pg = require("pg");
const { PORT } = require("./config");
const routes = require('./Routes/route')

require("./db");

const app = express();
app.use(express.json());

app.use("/user", routes);






app.listen(PORT, () => console.log(`server running on port ${PORT}`));