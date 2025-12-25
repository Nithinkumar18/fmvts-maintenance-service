const mnsResInfo = require('../constants/responseInfo');
const mnsHttpCons = require('../constants/statusConstants');
const logger = require('../loggers/logger');


const authorizeRole = (allowedRoles) => {
    return (req,res,next) => {
        try{
           const received_URole = req.headers['x-user-role'];
           const elgibleUser = allowedRoles.includes(received_URole);
        if(elgibleUser){
            logger.info(`SERVICE: ${mnsResInfo.SERVICE} || MESSAGE: ${mnsResInfo.ROLE_VALIDATION}`);
            next();
        }
        else{
            logger.info(`SERVICE: ${mnsResInfo.SERVICE} || MESSAGE: ${mnsResInfo.ACCESS_DENIED} `);
            return res.status(mnsHttpCons.UNAUTHORIZED).json({message:mnsResInfo.ACCESS_DENIED});
        }
        }
        catch(err){
            logger.error(`SERVICE: ${mnsResInfo.SERVICE} || MESSAGE: ${mnsResInfo.ERROR_VALIDATING_ROLE} `)
           return res.status(httpStatusCons.INTERNAL_SERVER_ERROR).json({Error:err.message})
        }
    }

}

module.exports = {
    authorizeRole
};