/* eslint-disable */
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  User.prototype.validPassword = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword);
  };

  User.addHook('beforeCreate', (user) => {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null,
    );
  });
  return User;
};
