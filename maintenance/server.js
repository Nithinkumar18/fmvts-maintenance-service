const express = require('express');
const logger = require('./src/loggers/logger');
const app = express();
const mnsRoutes = require('./src/routes/maintenanceRoutes');
const infoResp = require('./src/constants/responseInfo');
require('dotenv').config();

app.use(express.json());
app.use('/v1/maintenance',mnsRoutes);
const PORT = process.env.PORT;

app.listen(PORT,() => {
    logger.info(`${infoResp.SERVICE} started on the PORT ${PORT} 👨🏻‍🔧🛻`);
})

