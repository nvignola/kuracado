"use strict";

const express = require("express");
const twilio = require("twilio");
const cfg = require("../config");

const client = twilio(cfg.twilioAccountSid, cfg.twilioAuthToken);
const router = express.Router();

const messages = {};
const messagesMock = {
  "+3911111111": {
    body: {
      "1587561257056": "I've finished my pills for the stomach",
      "1587561260135": "I would like to have the box with 99 pills in it.",
    },
  },
  "+3922222222": {
    body: {
      "1587561257056": "I need a receipt for anticoagulation",
      "1587561260135": "And I have strong headache and stomac pain.",
    },
  },
};

// GET: /dashboard
router.get("/all-messages", (req, res, next) => {
  res.send({ data: messagesMock });
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

router.post("/receive-message", ({ body }, res) => {
  const {
    From: from,
    Body: textMessage,
    Latitude: latitude,
    Longitude: longitute,
  } = body;

  const phoneNumberRegExp = /(?<phoneNum>\+?\d{8,})/;
  const [phoneNumber] = from.match(phoneNumberRegExp);

  const payload = {
    ...(textMessage && {
      body: {
        [+new Date()]: textMessage,
      },
    }),
    latitude,
    longitute,
  };

  if (messages.hasOwnProperty(phoneNumber)) {
    payload.body = {
      ...messages[phoneNumber].body,
      ...payload.body,
    };
    messages[phoneNumber] = { ...messages[phoneNumber], ...payload };
  } else {
    messages[phoneNumber] = payload;
  }
});
module.exports = router;
