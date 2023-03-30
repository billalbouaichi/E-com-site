const product = require("../models/productModel");
function prop(req, res, next) {
  const idfournisseurtoken = req.user.id;
  const { id } = req.params;
  console.log(req.user);
  const idfournisseur = product
    .findOne({ _id: id }, { fournisseur: 1 })
    .then((fournisseur) => {
      if (!fournisseur) {
        return Promise.reject(new Error("Product Not Found"));
      }
      console.log(fournisseur.fournisseur.toString());
      console.log(idfournisseurtoken);
      if (idfournisseurtoken == fournisseur.fournisseur.toString()) {
        next();
      } else {
        res.status(403).json({ message: "le produit ne vous appartient pas " });
      }
    })
    .catch((err) => {
      res.status(403).json({ message: "le produit ne vous appartient pas " });
    });
}
module.exports = prop;
