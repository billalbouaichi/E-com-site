const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.getSubCategorieSpValidator=[
    check('id').isMongoId().withMessage('Invalid SubCategorie ID'),
    validatorMiddleware,
]

exports.updateSubCategorieValidator=[
    check('name').notEmpty().withMessage('le champs Name is required')
    .isLength({min:3}).withMessage('trop petit')
    .isLength({max:60}).withMessage('trop grand')
   , check('id').isMongoId().withMessage('Invalid Subcategorie ID'),
   check("categorie")
    .notEmpty()
    .withMessage("une souscategorie doit avoir son parent categorie ID ")
    .isMongoId()
    .withMessage("Invalid categorie ID"),
    validatorMiddleware,
];

exports.createSubCategorieValidator = [
  check("name")
    .notEmpty()
    .withMessage("le champs Name is required")
    .isLength({ min: 2 })
    .withMessage("trop petit")
    .isLength({ max: 60 })
    .withMessage("trop grand"),
  check("categorie")
    .notEmpty()
    .withMessage("une souscategorie doit avoir son parent categorie ID ")
    .isMongoId()
    .withMessage("Invalid categorie ID"),
  validatorMiddleware,
];
exports.deleteSubCategorieValidator=[
 check('id').isMongoId().withMessage('Invalid Subcategorie ID'),
    validatorMiddleware,
];
