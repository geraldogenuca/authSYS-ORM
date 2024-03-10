const express = require('express')

//
const UsersControllers = require('../controllers/users-controllers')


//
const routes = express.Router()

//
routes.post('/users/register', UsersControllers.createUser)
routes.post('/users/login', UsersControllers.loginUser)
routes.get('/users', UsersControllers.indexUser)



module.exports = routes