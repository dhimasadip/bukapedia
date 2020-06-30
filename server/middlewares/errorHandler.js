module.exports = (err,req,res,next) => {

    let err_msg, err_code

    switch (err.str_code) {
        case 'REGISTRATION_VALIDATION':
            err_code = 400
            err_msg = err.err_data            
            break;
        case 'INCORRECT_PASSWORD':
            err_code = 400
            err_msg = 'Incorrect Password'            
            break;
        case 'PRODUCT_EXIST':
            err_code = 400
            err_msg = 'Product already exist'           
            break;
        case 'ADD_PRODUCT_VALIDATION':
            err_code = 400
            err_msg = err.err_data            
            break;
        case 'UPDATE_PRODUCT_VALIDATION':
            err_code = 400
            err_msg = err.err_data            
            break;
        case 'INVALID_TOKEN':
            err_code = 400
            err_msg = 'Invalid Token'            
            break;
        case 'UNAUTHORIZED':
            err_code = 403
            err_msg = 'Unauthorized!'            
            break;
        case 'USER_NOT_FOUND':
            err_code = 404
            err_msg = 'User Not Found'            
            break;
        case 'EMAIL_NOT_FOUND':
            err_code = 404
            err_msg = 'Email Not Found'            
            break;
        case 'PRODUCT_NOT_FOUND':
            err_code = 404
            err_msg = 'Product Not Found'            
            break;
        case 'TOKEN_NOT_FOUND':
            err_code = 404
            err_msg = 'Token Not Found'            
            break;
        default:
            err_code = 500
            err_msg = 'Internal server error'
    }
    
    res.status(err_code).json({ message: err_msg })
}