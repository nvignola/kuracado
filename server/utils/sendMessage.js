const twilio = require("twilio");
const cfg = require("../config");

const client = twilio(cfg.twilioAccountSid, cfg.twilioAuthToken);

module.exports = (to, body, mediaUrl) =>
  client.messages.create({
    from: `whatsapp:${cfg.twilioPhoneNumber}`,
    body,
    to: `whatsapp:${to}`,
    ...(mediaUrl && { mediaUrl }),
  });
