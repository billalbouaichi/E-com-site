const mongoose = require("mongoose");
const fournisseur = require("./userModel");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    categorie: {
      type: mongoose.Schema.ObjectId,
      ref: "categories",
      required: true,
    },
    fournisseur: {
      type: mongoose.Schema.ObjectId,
      ref: "users",
      required: true,
    },
    nouveauprix: {
      type: Number,
      required: true,
    },
    ancienprix: {
      type: Number,
    },
    quantite: {
      type: Number,
      required: true,
    },
    imageCover: {
      type: String,
    },
    images: [String],
  },
  { timestamps: true }
);
productSchema.pre("save", function (next) {
  const product = this;

  // Vérifier si le champ `name` a été modifié ou est nouveau.
  if (product.isModified("name") || product.isNew) {
    // Mettre la première lettre en majuscule.
    product.name = product.name.charAt(0).toUpperCase() + product.name.slice(1);
  }
  if (product.isModified("description") || product.isNew) {
    // Mettre la première lettre en majuscule.
    product.name = product.name.charAt(0).toUpperCase() + product.name.slice(1);
  }

  next();
});

module.exports = mongoose.model("product", productSchema);
