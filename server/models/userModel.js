const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
  {
    type: {
      type: [String],
      enum: ["Client", "Admin", "Fournisseurs", "Affiliate"],
      required: true,
    },
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
    adresse: [
      {
        type: String,
        trim: true,
        required: [true, "adresse est obligatoire"],
      },
    ],
    numtel: {
      type: String,
      required: true,
    },

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
    },
    numccp: {
      type: String,
      required: true,
    },
    numrc: {
      type: String,
    },
    numnif: {
      type: String,
    },
    relverib: {
      type: String,
    },
    photodeprofil: {
      type: String,
    },
  },
  { timestamps: true }
);
userSchema.methods.generateToken = function () {
  return jwt.sign(
    { id: this._id, type: this.type },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRE_TIME,
    }
  );
};
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  //hashing user password
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const user = mongoose.model("users", userSchema);

module.exports = user;
