const express = require('express')
//
, checkLogin = require('../middlewares/checkLogin')

//
, UsersControllers = require('../controllers/users-controllers')


//
, routes = express.Router()

//
routes
    .post('/users/register', UsersControllers.createUser)
    .post('/users/login', UsersControllers.loginUser)
    .get('/users', UsersControllers.indexUser)
    .delete('/users/delete/:id_user', checkLogin.required, UsersControllers.deleteUsers)


module.exports = routes