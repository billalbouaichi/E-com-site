const mongoose = require("mongoose");
//creation d'un shema
const CategorieSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 60,
    },
    //Sante et Beaute  = www.uno.dz/sante-et-beaute
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);
//creattion d'un model
const CategorieModel = mongoose.model("categories", CategorieSchema);

module.exports = CategorieModel;
