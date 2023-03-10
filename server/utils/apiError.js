//@desc     cette class est responsable des erreurs operationnel (error that i can predict )
//@
class ApiError extends Error {
    constructor(message , statusCode){
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith(4)? "fail" : "error";
        this.isOperationel = true;
    }
}
module.exports = ApiError;