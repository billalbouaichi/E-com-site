const mongoose = require("mongoose");

const subCategorieSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: [true, "Sub cat doit etre unique"],
      minlenght: [2, "doit depaser de caractere"],
      maxlenght: [60, "ne doit pas depacer les 60 caractere"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    categorie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categories",
      required: [true, "cat is required"],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("SubCategories", subCategorieSchema);
