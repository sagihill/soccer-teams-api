const dotenv = require("dotenv");

class Config {
  constructor() {
    dotenv.config();
  }

  get(key) {
    return process.env[key];
  }
}

module.exports = {
  Config: Config,
};
