const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

const { userSchema } = require("./users");

const Address = mongoose.model(
  "Address",
  new mongoose.Schema({
    location: {
      type: String,
      minlength: 5,
      maxlength: 255,
    },
    pinCode: {
      type: Number,
    },
    user: {
      type: userSchema,
    },
  })
);

valiadteAddress = (address) => {
  const schema = Joi.object({
    location: Joi.string().min(5).max(255).required(),
    pinCode: Joi.number().required(),
    userId: Joi.objectId().required(),
  });

  return schema.validate(address);
};

exports.Address = Address;
exports.valiadteAddress = valiadteAddress;
