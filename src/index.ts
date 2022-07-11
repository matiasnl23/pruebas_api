import express from "express";
import config from "config";
import routes from "./routes";
import mongoose from "mongoose";

try {
  (async () => {
    const port = config.get("port");
    const app = express();
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(routes);

    const db = {
      host: config.get("db.host"),
      port: config.get("db.port"),
      user: config.get("db.user"),
      pass: config.get("db.pass"),
      collection: config.get("db.collection"),
    };

    const mongoUrl = `mongodb://${db.user}:${db.pass}@${db.host}:${db.port}/${db.collection}`;
    await mongoose.connect(mongoUrl, { authSource: "admin" });

    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  })();
} catch (err) {
  console.error(err);
}
