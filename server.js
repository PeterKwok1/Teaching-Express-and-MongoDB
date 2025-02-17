import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import { userRouter } from "./routes/user_routes.js";

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

// "the path that you provide to the express.static function is relative to the directory from where you launch your node process" - express docs
// path.join(__dirname, "dist")
app.use(express.static("public"));

app.route("/").get((req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.use("/user", userRouter);

app.listen(8080, () => {
  console.log("App listening on http://localhost:8080");
});
