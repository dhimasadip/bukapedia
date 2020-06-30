const { User } = require('../models')
const checkPassword = require('../helpers/compareHash')
const { token } = require('../helpers/generate_JWT')

class UserController {

    static register(req,res,next) {
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        }

        User.create(newUser)
        .then(data => {
            let userData = data.dataValues
            delete userData.password
            delete userData.createdAt
            delete userData.updatedAt

            res.status(201).json(userData)
        })
        .catch(err => {
            if(err.errors) {
                let err_data = err.errors.map(el => {
                    if(el.message == 'email must be unique') {
                        return 'Email already exist'
                    }
                    return el.message
                })

                err_data = err_data.join('. ')

                next({ str_code: 'REGISTRATION_VALIDATION', err_data})
            } else {
                next({ str_code: 'INTERNAL_SERVER_ERROR' })
            }
        })
    }

    static login(req,res,next) {
        const { email } = req.body
        const { password } = req.body

        User.findOne({ where: { email } })
        .then(data => {
            if (data) {
                if (checkPassword(password, data.password)) {
                    let userData = data.dataValues
                    delete userData.password
                    delete userData.createdAt
                    delete userData.updatedAt

                    userData.access_token = token(userData)
                    res.status(200).json(userData)
                } else {
                    next({ str_code: 'INCORRECT_PASSWORD' })
                }
            } else {
                next({ str_code: 'EMAIL_NOT_FOUND' })
            }
        })
        .catch(() => {
            next({ str_code: 'INTERNAL_SERVER_ERROR'})
        })
    }
}

module.exports = UserController