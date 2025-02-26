if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const bcrypt = require('bcrypt');


async function pinHide(pin) {
    let saltRounds = parseInt(process.env.SALT_ROUND);
    let hash = await bcrypt.hash(pin, saltRounds);
    return hash;
}

module.exports = { pinHide };
