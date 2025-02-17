import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

const __dirname = import.meta.dirname;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
// path.join(__dirname, "dist")
// "the path that you provide to the express.static function is relative to the directory from where you launch your node process" - express docs

app.route("/").get((req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(8080, () => {
  console.log("App listening on http://localhost:8080");
});
