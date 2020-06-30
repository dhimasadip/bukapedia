const { User } = require('../models')

module.exports = (req,res,next) => {
 
    User.findByPk(req.user.id)
    .then(data => {
        data.role == 'admin' ? next() : next({ str_code: 'UNAUTHORIZED' })
    })
    .catch(() => {
        next({ str_code: 'INTERNAL_SERVER_ERROR' })
    })
}