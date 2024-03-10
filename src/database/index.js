require('dotenv').config()

const Sequelize = require('sequelize')
const db_config = require('../config/db_config')

//


const connection_db = new Sequelize(db_config)


//



module.exports = connection_db