const bcrypt = require('bcrypt')

module.exports = (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword)
}