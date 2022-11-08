const jwt = require("jsonwebtoken");
const JWT_SECRET = "AdityaIsAn3ntrepreneur";

const fetchuser = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token || token === null) {
    return res
      .status(401)
      .send({ Error: "Please authenticate using a valid token" });
  }
  try {
    jwt.verify(token, JWT_SECRET, (err, data) => {
      if (err) return res.status(403).json({ Error: "Please login again" });
      req.user = data.user;
      next();
    });
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ Error: "Please authenticate using a valid token" });
  }
};
module.exports = fetchuser;
