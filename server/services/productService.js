const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const factory = require("./handlersFactory");
const product = require("../models/productModel");
const verifyToken = require("../middlewares/verifieToken");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");

const { uploadMixOfImages } = require("../middlewares/uploadImageMiddleware");
/*-----------------------------
**@desc POST CREATE PRODUCT
**@Route POST api/v1/products
**@Acces PRIVATE ADMIN or FOURNISSEURS
-----------------------------*/
exports.createProduct = factory.createOne(product);

/*-----------------------------
**@desc GET CREATE PRODUCT
**@Route GET api/v1/products
**@Acces PUBLIC
-----------------------------*/
exports.getProducts = factory.getAll(product);
/*-----------------------------
**@desc GET Specifique Product
**@Route GET api/v1/products
**@Acces PUBLIC
-----------------------------*/

exports.getSpeProduct = factory.getOne(product);

/*-----------------------------
**@desc UPDATE Specifique Product
**@Route PUT api/v1/products
**@Acces PRIVATE 
-----------------------------*/
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const document = await product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      categorie: req.body.categorie,
      nouveauprix: req.body.nouveauprix,
      ancienprix: req.body.ancienprix,
      quantite: req.body.quantite,
      image: req.body.image,
    },
    {
      new: true,
    }
  );
  if (!document) {
    return next(new ApiError(`No document for this id ${req.params.id}`, 404));
  }
  // Trigger "save" event when update document
  document.save();
  res.status(200).json({ data: document });
});

/*-----------------------------
**@desc Delete Product
**@Route DELETE api/v1/products
**@Acces Private fournisseur or Admin
-----------------------------*/
exports.deleteProduct = factory.deleteOne(product);

/*-----------------------------
**@desc Get les produit dune categorie 
**@Route GET api/v1/products/categories
**@Acces PUBLIC 
-----------------------------*/
exports.getProductsByCategory = asyncHandler(async (req, res, next) => {
  const idcat = req.params.categories;
  const document = await product.find({ categorie: idcat });
  if (!document) {
    return next(new ApiError(`No document for this id ${req.params.id}`, 404));
  }
  res.status(200).json({ data: document });
});

/*-----------------------------
**@desc Get les produit dun fournisseur ou admin donne 
**@Route GET api/v1/products/
**@Acces Private
-----------------------------*/

exports.getProductsByFournisseur = asyncHandler(async (req, res, next) => {
  const { prop } = req.params;
  console.log(prop);
  const document = await product.find({ fournisseur: prop });
  if (!document) {
    return next(
      new ApiError(`No document for this id ${req.params.prop}`, 404)
    );
  }
  res.status(200).json({ data: document });
});

exports.uploadProductImages = uploadMixOfImages([
  {
    name: "imageCover",
    maxCount: 1,
  },
  {
    name: "images",
    maxCount: 5,
  },
]);

exports.resizeProductImages = asyncHandler(async (req, res, next) => {
  // console.log(req.files);
  //1- Image processing for imageCover
  if (req.files.imageCover) {
    const imageCoverFileName = `product-${uuidv4()}-${Date.now()}-cover.jpeg`;

    await sharp(req.files.imageCover[0].buffer)
      .resize(2000, 1333)
      .toFormat("jpeg")
      .jpeg({ quality: 95 })
      .toFile(`uploads/products/${imageCoverFileName}`);

    // Save image into our db
    req.body.imageCover = imageCoverFileName;
  }
  //2- Image processing for images
  if (req.files.images) {
    req.body.images = [];
    await Promise.all(
      req.files.images.map(async (img, index) => {
        const imageName = `product-${uuidv4()}-${Date.now()}-${index + 1}.jpeg`;

        await sharp(img.buffer)
          .resize(2000, 1333)
          .toFormat("jpeg")
          .jpeg({ quality: 95 })
          .toFile(`uploads/products/${imageName}`);

        // Save image into our db
        req.body.images.push(imageName);
      })
    );

    next();
  }
});
