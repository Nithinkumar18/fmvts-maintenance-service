const amqp = require('amqplib');
const logger = require('../loggers/logger');
const pmvInfo = require('../constants/responseInfo');
require('dotenv').config();



const sendMaintenanceData = async(mtsvdata) => {
    let connection,channel;
    try{
        connection = await amqp.connect(process.env.MESSAGE_QUEUE_URL);
        channel = await connection.createChannel();
        logger.info(`SERVICE - ${pmvInfo.SERVICE} - ${process.env.NOTIFICATION_QUEUE} : ${pmvInfo.QUEUE_CONN_SUCESS}`);
        await channel.assertQueue(process.env.NOTIFICATION_QUEUE,{durable:true});
        const event_Id = pmvInfo.EVENT_SUBNAME + Math.random().toString().slice(2,10).toUpperCase();
        const maintenanceEvent = {
             eventId:event_Id,
             eventType:pmvInfo.EVENT_TYPE,
             maintenanceData: mtsvdata
         }
         channel.sendToQueue(process.env.NOTIFICATION_QUEUE,Buffer.from(JSON.stringify(maintenanceEvent)));
       
        logger.info(`SERVICE - ${pmvInfo.SERVICE} - ${process.env.NOTIFICATION_QUEUE} : ${pmvInfo.MAINTENANCE_DATA_PUBLISH}`);

    }
    catch(error){
            logger.error(`SERVICE - ${process.env.NOTIFICATION_QUEUE} : ${error.message}`);
            throw error;
    }
    finally{
         
         await channel.close();
        await connection.close();
        logger.info(`SERVICE - ${process.env.NOTIFICATION_QUEUE} : ${pmvInfo.QUEUE_CON_CLOSE}`);
    }
}

module.exports = {
    sendMaintenanceData
}