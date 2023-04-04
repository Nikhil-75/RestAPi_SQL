const express = require("express");
const pg = require("pg");
const routes = require("./Routes/route");
const PORT = process.env.PORT || 8000;
require("./db");

const app = express();
app.use(express.json());

app.use("/user", routes);

app.listen(PORT, () => console.log(`server running on port ${PORT}`));





