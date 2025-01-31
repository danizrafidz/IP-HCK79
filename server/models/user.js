'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Module, { as: "Author", foreignKey: "AuthorId" })
      User.hasMany(models.MyModule, { foreignKey: "UserId" })
      User.belongsTo(models.Team, { foreignKey: "TeamId" })
    }
  }
  User.init({
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Full Name is required'
        },
        notEmpty: {
          msg: 'Full Name is required'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email must be unique'
      },
      validate: {
        notNull: {
          msg: 'Email is required'
        },
        notEmpty: {
          msg: 'Email is required'
        },
        isEmail: {
          args: true,
          msg: 'Invalid email format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password is required'
        },
        notEmpty: {
          msg: 'Password is required'
        },
        len: {
          args: [5],
          msg: 'Password minimum 5 characters',
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'user'
    },
    avatarUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "https://cdn-icons-png.flaticon.com/512/2165/2165674.png"
    },
    galleries: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    TeamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Team is required'
        },
        notEmpty: {
          msg: 'Team is required'
        }
      }
    },
  }, {
    hooks: {
      beforeCreate: (user) => {
        user.password = hashPassword(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};