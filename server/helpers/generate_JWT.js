const jwt = require('jsonwebtoken')

const token = (data) => {
    return jwt.sign(data, process.env.JWT_KEY)
}

const decode = (access_token) => {
    return jwt.verify(access_token, process.env.JWT_KEY)
}

module.exports = { token, decode }