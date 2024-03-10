require('dotenv').config()

const Users = require('../database/models/UsersModels')
, jwt = require('jsonwebtoken')
, bcrypt = require('bcrypt')

module.exports = {
    async createUser(req, res, next) {
        const { name_user, email, password, confirmPassword } = req.body;

        // Validations for create users.
        if (!name_user) 
            return res.status(422).json({ message: "User is required!" })

        if (!email) 
            return res.status(422).json({ message: "Email is required!" })

        if (!password) 
            return res.status(422).json({ message: "Password is required!" })     

        if (password !== confirmPassword) 
            return res.status(422).json({ message: "Password and confirmPassword is different!" })

        // Validating existing user.
        const userExist = await Users.findOne({ where:{ email: email } })
        if (userExist) 
            return res.status(422).json({ msg: 'Existe ja'})        

        //
        const passwordHash = await bcrypt.hash(req.body.password, 10)
        const users = new Users({ name_user, email, password: passwordHash })

        try {            
            await users.save()

            , response = {
                msg:  'User created successfully',
                createdUser: {
                    id_user: users.id,
                    name_user: req.body.name_user,
                    email: req.body.email,
                    password: users.password,
                    request: {
                        type: 'POST',
                        description: 'Inserted user!',
                        url: process.env.API_URL + 'users/' + users.id
                    }
                }
            }
            res.status(201).json(response)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    },
    async loginUser(req, res, next) {
        const { email, password } = req.body

        // Validate login.
        if (!email) 
            return res.status(422).json({ message: "Email is required!" })

        if (!password) 
            return res.status(422).json({ message: "Password is required!" })   

        // Check if user exists.
        const user = await Users.findOne({ where: { email: email } });

        if (!user) {
            return res.status(404).json({ msg: "User not found!" });
        }

        // Check password is valid.
        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            return res.status(422).json({ msg: "Password invalid!" });
        }

        try {
            const secret = process.env.SECRET_JWT

            const token = jwt.sign( { id: user.id_user }, secret )

            res.status(200).json({ message: "Autentic successfully!", token })
        } catch (error) {
            res.status(500).json({ message: error })
        }
    },
    async indexUser(req,res, next) {
        try {
            const users = await Users.findAll()

            , response = {
                length: users.length,
                users: users.map(allUsers => {
                    return {
                        id_user: allUsers.id,
                        name_user: allUsers.name_user,
                        email: allUsers.email,
                        request: {
                            type: 'GET',
                            description: 'Return index all users!',
                            url: process.env.API_URL + 'users/' + allUsers.id
                        }
                    }
                })
            }

            res.status(200).json(response)
        } catch (error) {
            res.status(500).json({ error: error })
        }        
    },
    
}