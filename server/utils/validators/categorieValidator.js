const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

exports.getCategorieSpValidator=[
    check('id').isMongoId().withMessage('Invalid Categorie ID'),
    validatorMiddleware,
]

exports.updateCategorieValidator=[
    check('name').notEmpty().withMessage('le champs Name is required')
    .isLength({min:3}).withMessage('trop petit')
    .isLength({max:60}).withMessage('trop grand')
   , check('id').isMongoId().withMessage('Invalid categorie ID'),
    validatorMiddleware,
];

exports.createCategorieValidator=[
    check('name').notEmpty().withMessage('le champs Name is required')
    .isLength({min:3}).withMessage('trop petit')
    .isLength({max:60}).withMessage('trop grand'),
    validatorMiddleware,
];

exports.deleteCategorieValidator=[
 check('id').isMongoId().withMessage('Invalid categorie ID'),
    validatorMiddleware,
];