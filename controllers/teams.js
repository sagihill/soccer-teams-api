const getTeams = (db) => (req, res, next) => {
  console.log("got the teams");
};

const getTeam = (db) => (req, res, next) => {
  console.log("got the team");
};

const isBookmark = (db) => (req, res, next) => {
  console.log("is bookmarked");
};

const updateBookmark = (db) => (req, res, next) => {
  console.log("updated bookmark");
};

module.exports = {
  getTeams,
  getTeam,
  isBookmark,
  updateBookmark,
};
