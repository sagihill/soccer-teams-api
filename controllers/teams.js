const getTeams = (db) => (req, res, next) => {
  db.select()
    .from("teams")
    .then((teams) => {
      if (teams.length) {
        res.json(teams);
      } else {
        res.status(404).json("Not found");
      }
    })
    .catch((err) => {
      res.status(400).json("Error getting teams", err);
    });
};

const getBookmarkedTeams = (db) => (req, res, next) => {
  db.select()
    .from("teams")
    .where("bookmark", true)
    .then((teams) => {
      if (teams.length) {
        res.json(teams);
      } else {
        res.status(200);
      }
    })
    .catch((err) => {
      res.status(400).json("Error getting bookmarked teams", err);
    });
};

const getTeamById = (db) => (req, res, next) => {
  const { id } = req.params;
  if (isNaN(id)) {
    console.log("not here");
    next();
  } else {
    db.select("*")
      .from("teams")
      .where({ id })
      .then((team) => {
        if (team.length) {
          res.json(team[0]);
        } else {
          res.status(404).json("Not found");
        }
      })
      .catch((err) => res.status(400).json("Error getting team by id"));
  }
};

const isBookmark = (db) => (req, res, next) => {
  const { id } = req.params;
  db.select("*")
    .from("teams")
    .where({ id })
    .then((team) => {
      if (team.length) {
        res.json({ isBookmark: team[0].bookmark });
      } else {
        res.status(404).json("Not found");
      }
    })
    .catch((err) => res.status(400).json("Error getting is team bookmarked"));
};

const updateBookmark = (db) => (req, res, next) => {
  const { id } = req.params;
  const { bookmark } = req.body;
  db.select("*")
    .from("teams")
    .where({ id })
    .update("bookmark", bookmark)
    .returning("*")
    .then((team) => {
      if (team.length) {
        res.json(team[0]);
      } else {
        res.status(404).json("Not found");
      }
    })
    .catch((err) => res.status(400).json("Error updating team bookmarked"));
};

module.exports = {
  getTeams,
  getBookmarkedTeams,
  getTeamById,
  isBookmark,
  updateBookmark,
};
