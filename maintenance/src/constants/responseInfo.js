
const info = {
 SERVICE: "FMAVTS-MaintenanceMicroService",
 allowedRole:"fleet_manager",
 ACCESS_DENIED: "You do not have the required permissions to perform this action; please contact support or an administrator for assistance if you believe this is an error",
 ROLE_VALIDATION: "user role validation success",
  ROLE_VALIDATION_FAIL: "user role validation failed",
  ROLE_EXTRACTED: "user role successfully fetched from request",
  CLIENT_REQ_SEND:"Establishing connection with the vehicle client",
  MNS_DATA_FETCHED_OK: "Maintenance Vehicles data fetched successfully from the vehicle client-VehicleMicroService",
  MNS_DATA_FETCHED_NOT_OK : "Error fetching details of vehicles under maintenance from the vehicle client",
  DISTANCE_TRAVELLED_THRESHOLD:5000,
  VEHICLES_MNTCE: "Currently, there are no vehicles scheduled for maintenance.”"
 
}
module.exports = info;