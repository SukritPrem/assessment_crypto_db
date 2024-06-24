const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("gameitem", "postgres", "postgres", {
  host: "127.0.0.1",
  port: 5432,
  dialect: "postgres",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

const Username = sequelize.define(
  "Username",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "username",
    timestamps: false,
  }
);

const GameItem = sequelize.define(
  "GameItem",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    item: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    description_item: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "gameitem",
    timestamps: false,
  }
);

// Define the CodeItem model
const CodeItem = sequelize.define(
  "CodeItem",
  {
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: Username,
        key: "username",
      },
    },
    codeNumber: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    item: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: GameItem,
        key: "item",
      },
    },
  },
  {
    tableName: "codeitem",
    timestamps: false,
    primaryKey: ["username", "item"],
  }
);

const ItemPrice = sequelize.define(
  "ItemPrice",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    item: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: GameItem,
        key: "item",
      },
    },
    havePromotion: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    pricePromotion: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    open_sell: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
    close_sell: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    tableName: "itemprice",
    timestamps: false,
  }
);

Username.hasMany(CodeItem, { foreignKey: "username" });
GameItem.hasMany(CodeItem, { foreignKey: "item" });
GameItem.hasMany(ItemPrice, { foreignKey: "item" });

sequelize
  .sync()
  .then(() => {
    console.log("Tables have been created");
  })
  .catch((error) => {
    console.error("Unable to create tables:", error);
  });

module.exports = {
  Username,
  GameItem,
  CodeItem,
  ItemPrice,
};
