"use strict";

const express = require("express");
const twilio = require("twilio");
const cfg = require("../config");

const client = twilio(cfg.twilioAccountSid, cfg.twilioAuthToken);
const router = express.Router();

// GET: /dashboard
router.get("/dashboard", (req, res, next) => {
  res.send({ data: "here data" });
});

// POST: /send-message
router.post("/send-message", async (req, res, next) => {
  const { to, body } = req.body;
  try {
    const { sid } = await client.messages.create({
      from: `whatsapp:${cfg.twilioPhoneNumber}`,
      body,
      to: `whatsapp:${cfg.patientPhoneNumber}`,
    });

    res.send({
      status: "success",
      message: `Message sent to ${to}. Message SID: ${sid}`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      status: "error",
      message: "Failed to send message. Check server logs for more details.",
    });
  }
});

module.exports = router;
