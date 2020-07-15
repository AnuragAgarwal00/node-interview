const express = require("express");
const router = express();

const { Address, valiadteAddress } = require("../models/address");
const { User } = require("../models/users");

router.post("/", async (req, res, next) => {
  // checking all body fields using joi
  try {
    const { error } = valiadteAddress(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findById(req.body.userId);
    if (!user) return res.status(400).send("User with given id was not found");

    const address = new Address({
      location: req.body.location,
      pinCode: req.body.pinCode,
      userId: req.body.userId,
      user: {
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: user.password,
      },
    });

    await address.save();

    res.send(address);
  } catch (error) {
    res.send(error.message);
  }
});

// editing user details route
router.put("/:address", async (req, res, next) => {
  try {
    // checking all body fields using joi
    const { error } = valiadteAddress(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findById(req.body.userId);
    if (!user) return res.status(400).send("User with given id was not found");

    const address = Address.findByIdAndUpdate(
      req.params.id,
      {
        location: req.body.location,
        pinCode: req.body.pinCode,
        user: {
          _id: user._id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          password: user.password,
        },
      },
      { new: true }
    ).select("-_v");

    if (!address) return res.status(404).send("Address with id was not found");

    res.send(address);
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
