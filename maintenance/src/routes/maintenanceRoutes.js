const express = require('express');
const mncController = require('../controller/maintenanceController');
const router = express.Router();
const {authorizeRole} = require('../middleware/authorizeUserRole');


router.get('/maintenance-check', authorizeRole(["admin"]),mncController.viewMaintenanceVehicles);


module.exports = router;