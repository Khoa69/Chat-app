const response = require("../utils/response");

const JoinSchemaValidation = (schema) =>{
    return async (req, res, next) =>{
        try{
            const result=await schema.validateAsync(req.body,{abortEarly:true});
            if (result.error){
                throw new Error(result.error);
            }
            else{
                next();
            }
        }catch(err){
            res.status(401).json(response({},{ message:"The information was invalid!"},0))
        }
    }
}

module.exports = JoinSchemaValidation;