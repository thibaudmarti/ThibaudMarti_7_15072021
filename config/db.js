const mongoose = require("mongoose");

mongoose
  .connect(process.env.CONNECT_MDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((err) => console.log("Connexion à MongoDB échouée !", err));

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "projet7bdd",
});
