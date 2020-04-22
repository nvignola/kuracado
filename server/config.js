const path = require("path");
require("dotenv-safe").config({
  path:
    process.env.NODE_ENV === "test"
      ? path.resolve(__dirname, "../.env.example")
      : undefined,
});

const cfg = {};

// HTTP Port to run our web application
cfg.port = process.env.PORT || 3000;
cfg.twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
cfg.twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
cfg.patientPhoneNumber = process.env.PATIENT_PHONE_NUMBER;
cfg.doctorPhoneNumber = process.env.DOCTOR_PHONE_NUMBER;
cfg.pharmacyPhoneNumber = process.env.PHARMACY_PHONE_NUMBER;

// Export configuration object
module.exports = cfg;
