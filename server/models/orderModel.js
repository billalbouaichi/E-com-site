const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "orderItem",
      required: true,
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  adresse: {
    type: String,
    required: true,
  },
  telephone: {
    type: String,
  },
  prixTotal: {
    type: Number,
    required: true,
  },
  etat: {
    type: String,
    enum: ["Valider", "Refuser"],
    default: "Refuser",
  },
});

module.exports = mongoose.model("order", orderSchema);
