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
  client: "pg",
  connection: {
    host: config.get("POSTGRES_HOST"),
    user: config.get("POSTGRES_USER"),
    password: config.get("POSTGRES_PASSWORD"),
    database: config.get("POSTGRES_DB"),
  },
});
const app = express();

// Applying middleware
app.use(morgan("combined"));
app.use(cors());
app.use(express.json());

//Seeding db with external API
seed.seedTeams(db);

//Controllers
app.get("/", (req, res) => {
  res.send("ITS WORKING!");
});

app.get("/teams", teams.getTeams(db));
app.get("/teams/:id", teams.getTeam(db));
app.get("/teams/isBookmark/:id", teams.isBookmark(db));
app.patch("/teams/bookmark/:id", teams.updateBookmark(db));

const backendPort = config.get("BACKEND_API_PORT");

app.listen(backendPort, () => {
  console.log(`app is running on port ${backendPort}`);
});

// server.js
