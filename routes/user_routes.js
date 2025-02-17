import express from "express";
import { Users } from "../models/user_model.js";

export const userRouter = express.Router();

userRouter.post("/saveUser", async (req, res) => {
  const { name, email } = req.body;

  try {
    const user = new Users({ name, email });
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (error) {
    res.status(500).send();
  }
});

userRouter.put("/updateUser", async (req, res) => {
  const { _id, name, email } = req.body;

  try {
    const user = await Users.findById(_id);
    user.name = name;
    user.email = email;

    // _id (ObjectId)
    console.log(user._id);
    console.log(`Type: ${typeof user._id}`);

    const updatedUser = await user.save(); // prefered to findOneAndUpdate
    res.json(updatedUser);
  } catch (error) {
    res.status(500).send();
  }
});

userRouter.delete("/deleteUser", async (req, res) => {
  const { _id } = req.body;
  try {
    const deleteResult = await Users.findByIdAndDelete(_id);
    res.json(deleteResult);
  } catch (error) {
    res.status(500).send();
  }
});

userRouter.get("/getUsers", async (req, res) => {
  const users = await Users.find({}); // mongoose returns query object.
  res.json(users);
});
