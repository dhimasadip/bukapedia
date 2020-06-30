const { decode } = require('../helpers/generate_JWT')
const { User } = require('../models')

module.exports = (req,res,next) => {

    const { access_token } = req.headers

    if (!access_token) return next({ str_code: 'TOKEN_NOT_FOUND' })

    try {
        const userData = decode(access_token)

        User.findByPk(userData.id)
        .then(data => {
            if (data) {
                req.user = userData
                next()
            } else {
                next({ str_code: 'USER_NOT_FOUND' })
            }
        })
        .catch(() => {
            next({ str_code: 'INTERNAL_SERVER_ERROR' })
        })

    } catch {
        next({ str_code: 'INVALID_TOKEN' })
    }

}