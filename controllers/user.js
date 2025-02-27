const UserData = require("../models/userData.js");
const { findPin, pinHide } = require("../utils/bycryptFunction.js");

module.exports.getUser = async (req, res) => {
  let result;
  if (req.query.email) {
    result = await UserData.findOne({ email: req.query.email });
  } else {
    result = await UserData.find({
      accountStatus: { $in: ["active", "banned"] },
    }).sort({ createdAt: -1 });
  }
  res.send(result);
};

module.exports.postUser = async (req, res) => {
  const { name, email, pin, role, nid, phone, phoneCountry, image } = req.body;

  if (!name || !email || !pin || !role || !nid || !phone || !phoneCountry) {
    return res.status(400).send({ error: "Missing required fields" });
  }
  const hashPin = await pinHide(pin);

  let newUser = {
    name,
    email,
    phone,
    phoneCountry,
    pin: hashPin,
    image,
    role,
    nid,
    accountStatus: role === "User" ? "active" : "pending",
    currentBalance: role === "User" ? 40 : 100000,
  };

  const addNewUser = new UserData(newUser);
  const result = await addNewUser.save();

  res.status(201).send({ message: "User created successfully", result });
};

module.exports.getUserById = async (req, res) => {
  let result = await UserData.findById(req.params.id).populate("transactions");
  res.send(result);
};

module.exports.editUser = async (req, res) => {
  let { status, id } = req.body;
  let result = await UserData.findByIdAndUpdate(
    id,
    { accountStatus: status },
    { new: true }
  );
  res.send(result);
};

module.exports.getNewUser = async (req, res) => {
  result = await UserData.find({ accountStatus: { $in: "pending" } }).sort({
    createdAt: -1,
  });
  res.send(result);
};

module.exports.pinVerify = async (req, res) => {
  let email = req.query.email;
  let pin = req.body.pin;

  let user = await UserData.findOne({ email: email });
  let hashPin = user.pin;

  const result = await findPin(hashPin, pin);

  res.send(result);
};
