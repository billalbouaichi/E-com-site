const asyncHandler = require('express-async-handler');

const factory = require('./handlersFactory');
const user = require('../models/userModel');



// @desc    Get list of users
// @route   GET /api/v1/users
// @access  PRIVATE
exports.getUsers = factory.getAll(user);

// @desc    Get specific user by id
// @route   GET /api/v1/users/:id
// @access  PRIVATE
exports.getUser = factory.getOne(user);

// @desc    Create user
// @route   POST  /api/v1/users
// @access  Private
exports.createUser = factory.createOne(user);

// @desc    Update specific users
// @route   PUT /api/v1/users/:id
// @access  Private
exports.updateUser = factory.updateOne(user);

// @desc    Delete specific users
// @route   DELETE /api/v1/users/:id
// @access  Private
exports.deleteUser = factory.deleteOne(user);