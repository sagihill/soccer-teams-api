const { RequestModerator } = require("../utils/requestModerator");

const requestsModeratorMiddlware = function (req, res, next) {
  const skip = !!req.originalUrl.match("favicon");
  if (skip) {
    next();
  }
  const moderator = RequestModerator.getService();
  const isTooMany = moderator.request();
  if (isTooMany) {
    res.status(429).json("Too many requests");
  } else {
    next();
  }
};

module.exports = {
  requestsModeratorMiddlware,
};
