"use strict";

const express = require("express");
const sendMessage = require("../utils/sendMessage");
const createReceipt = require("../utils/createReceipt");
const faker = require("faker");
const cfg = require("../config");
const router = express.Router();

const messages = {};

// GET: /all-messages
router.get("/all-messages", (req, res, next) => {
  res.send({ data: messages });
});

// POST: /send-message
router.post("/send-message", async (req, res, next) => {
  const params = {
    patientFullname: req.body.patientFullname,
    patientInsuranceID: req.body.patientInsuranceID,
    medications: req.body.medications,
  };

  const fileName = await createReceipt(params);
  const { to, body } = req.body;
  const receiptUrl = `${cfg.serverUrl}/${fileName}`;

  messages[fromWeb].receiptLink = receiptUrl;

  try {
    const { sid } = await sendMessage(to, body, receiptUrl);
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

// POST: /receive-message
router.post("/receive-message", ({ body }, res) => {
  const {
    From: from,
    Body: textMessage,
    Latitude: latitude,
    Longitude: longitute,
  } = body;

  const phoneNumberRegExp = /(?<phoneNum>\+?\d{8,})/;
  const [phoneNumber] = from.match(phoneNumberRegExp);

  const geoData = {
    latitude,
    longitute,
  };

  const message = {
    receivedAt: +new Date(),
    textMessage,
  };

  if (messages.hasOwnProperty(phoneNumber)) {
    messages[phoneNumber].messages.push(message);
    messages[phoneNumber] = { ...messages[phoneNumber], ...geoData };
  } else {
    const extra = {
      name: faker.name.findName(),
      insuranceId: faker.internet.password(),
    };

    messages[phoneNumber] = { messages: [message], ...geoData, ...extra };
  }
});

module.exports = router;
