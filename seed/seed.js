const axios = require("axios");
const { Config } = require("../utils/config");
const config = Config.getService();

const deploySchema = (db) => {
  db.schema.hasTable("teams").then((exists) => {
    if (!exists) {
      return db.schema.createTable("teams", (table) => {
        table.increments().primary();
        table.string("referenceId");
        table.string("name");
        table.string("yearFounded");
        table.string("crestImageUrl");
        table.boolean("bookmark");

        table.unique(["referenceId"]);
      });
    }
  });
};

const seedTeams = (db) => {
  const teams = db
    .select()
    .table("teams")
    .then((teams) => {
      if (!teams.length) {
        axios
          .get(config.get("SPORTMONKS_API_URL"))
          .then((response) => {
            return formatAPIResponse(response.data.data);
          })
          .then((teams) => {
            db.insert(teams)
              .into("teams")
              .then(() => console.log("Seeded teams successfully!"))
              .catch((err) => console.log);
          });
      }
    })
    .catch((err) => console.log);
};

const formatAPIResponse = (data) => {
  return data.map((team) => {
    return {
      referenceId: team.id,
      name: team.name,
      yearFounded: String(team.founded),
      crestImageUrl: team.logo_path,
      bookmark: false,
    };
  });
};

module.exports = {
  deploySchema,
  seedTeams,
};
