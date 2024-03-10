require('dotenv').config()

// LIBS and ROUTES to app
const express = require('express')
, app = express()
, morgan = require('morgan')

//
require('./database/index')

// routes import
const UsersRoutes = require('./routes/users.routes')


// LIBS resource initialization
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('./public'))
app.use(morgan('dev'))


// get ROUTES to project
app.use('/', UsersRoutes)


// Server project
app.listen(
    process.env.SERVER_PORT || 4001, 
    console.log(`Server is running in port: ${process.env.SERVER_PORT}!`)
)