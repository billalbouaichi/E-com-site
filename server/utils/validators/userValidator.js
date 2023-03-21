const { check, body } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const bcrypt = require("bcryptjs");
const user = require("../../models/userModel");

exports.createUserValidator = [
  check("type")
    .notEmpty()
    .withMessage("le type de utilisateur doit etre rensignie")
    .isIn(["Client", "Admin", "Fournisseurs", "Affiliate"])
    .withMessage(
      "le type de utilisateur doit etre Client Admin Fournisseurs Affiliate"
    ),
  check("nom")
    .notEmpty()
    .withMessage("Le champs nom doit etre rensigner")
    .isLength({ min: 3 })
    .withMessage("nom trop petit")
    .isLength({ max: 50 })
    .withMessage("nom est trop grand"),
  check("prenom")
    .notEmpty()
    .withMessage("Le champs prenom doit etre rensigner")
    .isLength({ min: 3 })
    .withMessage("prenom trop petit")
    .isLength({ max: 50 })
    .withMessage("prenom est trop grand"),
  check("adresse")
    .notEmpty()
    .withMessage("le champs adresse doit etre rensigner")
    .isLength({ min: 3 })
    .withMessage("trop petit pour une adresse")
    .isLength({ max: 70 })
    .withMessage("trop grand pour une adresse"),
  check("numtel")
    .notEmpty()
    .withMessage("Le numéro de téléphone doit être renseigné")
    .isMobilePhone("ar-DZ")
    .withMessage("Le numéro de téléphone est Invalide")
    .isLength({ min: 10 })
    .withMessage("Le numéro de téléphone doit contenir au moins 10 chiffres")
    .isLength({ max: 20 })
    .withMessage("Le numéro de téléphone est trop long"),
  check("email")
    .notEmpty()
    .withMessage("L'email doit être renseigné")
    .isEmail()
    .withMessage("L'email est invalide")
    .custom((val) => {
      return user.findOne({ email: val }, { _id: 1 }).then((user) => {
        if (user) {
          return Promise.reject(new Error("cet email existe deja"));
        }
      });
    }),
  check("password")
    .notEmpty()
    .withMessage("Le mot de passe doit être renseigné")
    .isLength({ min: 6 })
    .withMessage("Le mot de passe doit contenir au moins 6 caractères"),
  check("numccp")
    .notEmpty()
    .withMessage("Le numéro de CCP doit être renseigné")
    .isLength({ min: 10 })
    .withMessage("Le numéro de CCP est invalide"),
  check("numrc")
    .optional({ nullable: true })
    .isLength({ min: 10 })
    .withMessage("Le numéro de RC est invalide"),
  check("numnif")
    .optional({ nullable: true })
    .isLength({ min: 10 })
    .withMessage("Le numéro de NIF est invalide"),
  check("relverib")
    .optional({ nullable: true })
    .isLength({ min: 10 })
    .withMessage("Le RIB est invalide"),
  check("photodeprofil")
    .optional({ nullable: true })
    .isLength({ max: 255 })
    .withMessage("La photo de profil doit contenir moins de 255 caractères"),
  validatorMiddleware,
];

exports.updateUserValidator = [
  check("id").isMongoId().withMessage("Invalid User ID"),
  check("type")
    .optional({ nullable: true })
    .isIn(["Client", "Admin", "Fournisseurs", "Affiliate"])
    .withMessage(
      "le type de utilisateur doit etre Client Admin Fournisseurs Affiliate"
    ),
  check("nom")
    .optional({ nullable: true })
    .isLength({ min: 3 })
    .withMessage("nom trop petit")
    .isLength({ max: 50 })
    .withMessage("nom est trop grand"),
  check("prenom")
    .optional({ nullable: true })
    .isLength({ min: 3 })
    .withMessage("prenom trop petit")
    .isLength({ max: 50 })
    .withMessage("prenom est trop grand"),
  check("adresse")
    .optional({ nullable: true })
    .isLength({ min: 3 })
    .withMessage("trop petit pour une adresse")
    .isLength({ max: 70 })
    .withMessage("trop grand pour une adresse"),
  check("numtel")
    .optional({ nullable: true })
    .isMobilePhone("ar-DZ")
    .withMessage("Le numéro de téléphone est Invalide")
    .isLength({ min: 10 })
    .withMessage("Le numéro de téléphone doit contenir au moins 10 chiffres")
    .isLength({ max: 20 })
    .withMessage("Le numéro de téléphone est trop long"),
  check("email")
    .optional({ nullable: true })
    .isEmail()
    .withMessage("L'email est invalide")
    .custom((val) => {
      return user.findOne({ email: val }, { _id: 1 }).then((user) => {
        if (user) {
          return Promise.reject(new Error("cet email existe deja"));
        }
      });
    }),
  check("password")
    .optional({ nullable: true })
    .isLength({ min: 6 })
    .withMessage("Le mot de passe doit contenir au moins 6 caractères"),
  check("numccp")
    .optional({ nullable: true })
    .isLength({ min: 10 })
    .withMessage("Le numéro de CCP est invalide"),
  check("numrc")
    .optional({ nullable: true })
    .isLength({ min: 10 })
    .withMessage("Le numéro de RC est invalide"),
  check("numnif")
    .optional({ nullable: true })
    .isLength({ min: 10 })
    .withMessage("Le numéro de NIF est invalide"),
  check("relverib")
    .optional({ nullable: true })
    .isLength({ min: 10 })
    .withMessage("Le RIB est invalide"),
  check("photodeprofil")
    .optional({ nullable: true })
    .isLength({ max: 255 })
    .withMessage("La photo de profil doit contenir moins de 255 caractères"),
  validatorMiddleware,
];

exports.getUservalidator = [
  check("id").isMongoId().withMessage("Invalid ID"),
  validatorMiddleware,
];

exports.deleteUservalidator = [
  check("id").isMongoId().withMessage("Invalid ID"),
  validatorMiddleware,
];

exports.changeUserPasswordValidator = [
  check("id").isMongoId().withMessage("Invalid ID"),
  body("currentpassword")
    .notEmpty()
    .withMessage("Current password is required"),
  body("confirmpassword")
    .notEmpty()
    .withMessage("Confirm Password is required"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .custom(async (val, { req }) => {
      //currentpassword exist  = password in data base
      //confirmpassword == password
      const User = await user.findById(req.params.id);
      if (!User) {
        throw new Error("User not found");
      }
      const isCorrect = await bcrypt.compare(
        req.body.currentpassword,
        User.password
      );
      if (!isCorrect) {
        throw new Error("le mot de passe est incorrect");
      }
      if (val !== req.body.confirmpassword) {
        throw new Error("password Confirm est incorrect");
      }
      return true;
    }),
  validatorMiddleware,
];
