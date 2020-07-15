const express = require("express");
const router = express();

const { User, validateUser } = require("../models/users");

//routes for getting all users
router.get("/", async (req, res, next) => {
  try {
    const users = await User.find().sort("firstname").select("-_v");

    res.send(users);
  } catch (error) {}
});

// routes for creating new user
router.post("/", async (req, res, next) => {
  try {
    // validate body using joi package
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already registered.");

    user = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
    });

    await user.save();
    res.send(user);
  } catch (error) {}
});

// routes for changing password
router.put("/:id", async (req, res, next) => {
  try {
    // validate body using joi package
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findByIdAndUpdate(req.params.id, {
      password: req.body.password,
    }).select("-_v");
    if (!user) return res.status(404).send("Invalid userID");

    res.send(`${user.firstname} password was successfully updated`);
  } catch (error) {
    res.send(error.message);
  }
});

// routes for deleting particular user
router.delete("/:id", async (req, res, next) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);

    if (!user) return res.status(404).send("Invalid UserId");

    res.send(user);
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
