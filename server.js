const express = require("express");

// loading .env
const { Config } = require("./utils/config");
const config = Config.getService();

const morgan = require("morgan");
const cors = require("cors");
const knex = require("knex");
const teams = require("./controllers/teams");
const seed = require("./seed/seed");
const { RequestModerator } = require("./utils/requestModerator");
const { requestsModeratorMiddlware } = require("./middleware/requestModerator");

// Config database
const env = config.get("ENV");
const connectionString =
  env == "PROD" ? config.get("DATABASE_URL") : config.get("DEV_DATABASE_URL");

const db = knex({
  client: "pg",
  connection: {
    connectionString,
    ssl: { rejectUnauthorized: false },
  },
});

const app = express();

// Applying middleware
app.use(morgan("combined"));
app.use(cors());
app.use(requestsModeratorMiddlware);
app.use(express.json());

//Seeding db with external API
seed.deploySchema(db);
seed.seedTeams(db);

//Controllers
app.get("/", (req, res) => {
  res.send("ITS WORKING!");
});

app.get("/teams", teams.getTeams(db));
app.get("/teams/:id", teams.getTeamById(db));

app.get("/teams/bookmark", teams.getBookmarkedTeams(db));
app.patch("/teams/bookmark/:id", teams.updateBookmark(db));
app.get("/teams/isBookmark/:id", teams.isBookmark(db));

app.get("*", function (req, res) {
  res.status(404).json("Sorry, this path is not available");
});

const backendPort =
  env == "PROD" ? config.get("PORT") : config.get("DEV_API_PORT");

app.listen(backendPort, () => {
  console.log(`app is running on port ${backendPort}`);
});

// server.js
