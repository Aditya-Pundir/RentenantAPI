const express = require("express");
const connectToMongo = require("./db");
const bodyParser = require("body-parser");

connectToMongo();

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.status(200).send("Welcome to the TenantManager API");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/tenant", require("./routes/tenant"));
// app.use("/api/common", require("./routes/common"));
app.use("/api/rent", require("./routes/rent"));

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
