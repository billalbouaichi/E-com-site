const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      trim: true,
      required: [true, "nom est obligatoire"],
    },
    prenom: {
      type: String,
      trim: true,
      required: [true, "prenom obligatoire"],
    },
    adresse: {
      type: String,
      trim: true,
      required: [true, "adresse est obligatoire"],
    },
    telephone: String,
    numccp: String,
    email: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "email est obligatoire"],
    },
    password: {
      type: String,
      required: [true, "password est obligatoire"],
      minlength: [6, "trop petit"],
    }
  },
  { timestamps: true }
);

const user = mongoose.model("User", userSchema);

module.exports = user;
