import mongoose from "mongoose";

// Each schema maps to a MongoDB collection and defines the shape of the documents within that collection. - docs
// Index's are only made once?
const userSchema = mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
});

// Models are fancy constructors compiled from Schema definitions. An instance of a model is called a document. Models are responsible for creating and reading documents from the underlying MongoDB database. - docs
export const Users = mongoose.model("Users", userSchema);
