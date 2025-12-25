const logger = require('../loggers/logger');
const httpStatusCons = require('../constants/statusConstants');
const maintenanceInfo = require('../constants/responseInfo');
const mtsService = require('../service/maintenanceService');


const viewMaintenanceVehicles = async(req,res) => {
    try{
        logger.info(`SERVICE - ${maintenanceInfo.SERVICE} : ${req.path}`);
        const current_Role = req.headers['x-user-role'];
        logger.info(`SERVICE - ${maintenanceInfo.ROLE_EXTRACTED}`);
        const vehicles_list = await mtsService.getMaintenanceVehicles(current_Role);
        return res.status(httpStatusCons.SUCCESS).json({vehicles_list});
    }
    catch(err){
         return res.status(httpStatusCons.INTERNAL_SERVER_ERROR).json(err.message);
    }
}

module.exports = {viewMaintenanceVehicles};