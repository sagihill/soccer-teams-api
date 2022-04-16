import { RequestModerator } from "../utils/requestModerator";

export const requestsModeratorMiddlware = function (req, res, next) {
  const moderator = RequestModerator.getService();
  const isTooMany = moderator.request();
  if (isTooMany) {
    res.status(429).json("Too many requests");
  } else {
    next();
  }
};
