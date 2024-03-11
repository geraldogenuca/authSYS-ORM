require('dotenv').config()

// LIBS and ROUTES to app
const express = require('express')
, app = express()
, cors = require('cors')
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
app.use(cors())


// get ROUTES to project
app.use('/', UsersRoutes)

// ERROR treatment
app.use((req, res, next) => {
    const error = new Error('Route not found!')
    error.status = 404
    next(error)
})
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    return res.send({
        error: { msg: error.message }
    })
})

// Server project
app.listen(
    process.env.SERVER_PORT || 4001, 
    console.log(`Server is running in port: ${process.env.SERVER_PORT}!`)
)