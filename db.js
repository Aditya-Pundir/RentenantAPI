const mongoose = require("mongoose");
const mongoURI = `mongodb+srv://${process.env.DB_CREDS}@rentmanager.mahme.mongodb.net/TenantManager?retryWrites=true&w=majority`;

const connectToMongo = async () => {
  await mongoose
    .connect(mongoURI, {
      autoIndex: false,
    })
    .then((con) =>
      console.log("Established connection with MongoDB successfully")
    );
};

module.exports = connectToMongo;
