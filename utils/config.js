const dotenv = require("dotenv");

class Config {
  instance = null;
  constructor() {
    dotenv.config();
  }

  static getService() {
    if (!this.instance) {
      this.instance = new Config();
    }
    return this.instance;
  }

  get(key) {
    return process.env[key];
  }
}

module.exports = {
  Config: Config,
};
