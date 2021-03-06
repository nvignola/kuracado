require("dotenv-safe").config();

const cfg = {};

// HTTP Port to run our web application
cfg.port = process.env.PORT || 1337;
cfg.twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
cfg.twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
cfg.twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
cfg.patientPhoneNumber = process.env.PATIENT_PHONE_NUMBER;
cfg.pharmacyPhoneNumber = process.env.PHARMACY_PHONE_NUMBER;
cfg.serverUrl = process.env.SERVER_URL;

// Export configuration object
module.exports = cfg;
