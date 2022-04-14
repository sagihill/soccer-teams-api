const express = require("express");

// loading .env
const { Config } = require("./utils");
const config = new Config();

const morgan = require("morgan");
const cors = require("cors");
const knex = require("knex");
const teams = require("./controllers/teams");
const seed = require("./seed/seed");

// Config database

const db = knex({
  // connect to your own database here:
  client: "pg",
  connection: {
    host: "127.0.0.1",
    port: 5433,
    user: "postgres",
    password: "sagi1991",
    database: "postgres",
  },
});

const app = express();

// Applying middleware
app.use(morgan("combined"));
app.use(cors());
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

const backendPort = config.get("BACKEND_API_PORT");

app.listen(backendPort, () => {
  console.log(`app is running on port ${backendPort}`);
});

// server.js
