import { Sequelize } from "sequelize";

import dbConfig from "../config/database";

// models

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: "mysql",
    define: {
      timestamps: true,
      underscored: true,
    },
  }
);

// models arrays
// const models = [];

// init models
// models.forEach((model) => {
//   model.initModel(sequelize);
// });

// associations

export default sequelize;
