const Sequelize = require('sequelize');

const connection = new Sequelize('dewdropsweb', 'postgres', '2ManageBean4!', {
  host: 'dewdrops-db.c5otqhj2icqw.us-west-1.rds.amazonaws.com',
  dialect: 'postgres' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});

const User = connection.define(
  'user',
  {
    // attributes
    name: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    // options
  }
);

const Dewdrop = connection.define(
  'dewdrop',
  {
    // attributes
    userid: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    imageName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    caption: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    // options
  }
);

const Comment = connection.define(
  'comment',
  {
    // attributes
    dewdropid: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    userid: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    commentText: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    // options
  }
);

// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  connection,
  User,
  Dewdrop,
  Comment
};
