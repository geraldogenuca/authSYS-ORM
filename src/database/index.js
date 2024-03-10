require('dotenv').config()

const Sequelize = require('sequelize')
, db_config = require('../config/db_config')

//
, Users = require('./models/UsersModels')

, connection_db = new Sequelize(db_config)


//
Users.init(connection_db)


module.exports = connection_db