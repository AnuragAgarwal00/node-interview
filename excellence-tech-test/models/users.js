const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
    minlength: 5,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
    minlength: 5,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
});

const User = mongoose.model("User", userSchema);

validateUser = (user) => {
  const schema = Joi.object({
    firstname: Joi.string().min(5).max(50).required(),
    lastname: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(50).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(user);
};

exports.validateUser = validateUser;
exports.userSchema = userSchema;
exports.User = User;
