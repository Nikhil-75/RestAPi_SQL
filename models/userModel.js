const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../db')

class User extends Model {}

const userSchema = {

    userName: { type: DataTypes.STRING, allowNull: false, unique: true },

    firstName: { type: DataTypes.STRING,  allowNull: false },

    lastName: { type: DataTypes.STRING, allowNull: false },

    email: { type: DataTypes.STRING, allowNull: false, unique: true},

    password: { type: DataTypes.STRING, allowNull: false }

    

};

User.init(userSchema,{
    sequelize,
    className:'users'
});

module.exports = User