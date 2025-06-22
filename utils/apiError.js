<<<<<<< HEAD
class ApiError extends Error {
    constructor(message , statusCode){
=======
class ApiError extends Error{
    constructor(message,statusCode) {
>>>>>>> d0c141c8d225d3fef45d5b85350d26a93912523d
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith(4)? 'fail' : 'error';
        this.isOperational = true;
    }
<<<<<<< HEAD
}
=======
}    
>>>>>>> d0c141c8d225d3fef45d5b85350d26a93912523d

module.exports = ApiError;