const logger = require('../loggers/logger');
const infoMsg = require('../constants/responseInfo');
const axios = require('axios');
const {sendMaintenanceData} = require('../events/publishMaintenanceVehicles');


const getMaintenanceVehicles = async (userRole) => {
    try {
        let vehicles = [];
        const roleHeaders = {
            'x-user-role': userRole
        }
        logger.info(`SERVICE - ${infoMsg.CLIENT_REQ_SEND}`);
        const vehicless = await axios.get(`${process.env.VEHICLE_CLIENT}/v1/vehicle/travelDistance`, { headers: roleHeaders });
        logger.info(`SERVICE - ${infoMsg.MNS_DATA_FETCHED_OK}`);
        const maintenanceVehiclesData = vehicless.data;
        maintenanceVehiclesData.forEach((mvdata) => {
                if (mvdata.distanceTravelled >= infoMsg.DISTANCE_TRAVELLED_THRESHOLD) {
                    vehicles.push(mvdata);
                }
            })
        if (vehicles.length > 0) {
            await sendMaintenanceData(vehicles);
            logger.info(`SERVICE - ${infoMsg.MAINTENANCE_DATA_PUBLISH}`);
            return vehicles;
        }
        else {
           
            return infoMsg.VEHICLES_MNTCE
        }
    }
    catch (err) {
        throw err;
    }

}

module.exports = { getMaintenanceVehicles };