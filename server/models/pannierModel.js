const mongoose = require("mongoose");
const createPannierValidator = require("../utils/validators/pannierValidator");
const OrderItemsSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    quantite: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
OrderItemsSchema.pre("save", async function (next) {
  createPannierValidator;
  next();
});
module.exports = mongoose.model("orderItem", OrderItemsSchema);
