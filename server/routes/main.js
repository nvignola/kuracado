"use strict";

const express = require("express");
const sendMessage = require("../utils/sendMessage");
const createReceipt = require("../utils/createReceipt");
const faker = require("faker");
const cfg = require("../config");
const router = express.Router();

const messages = {};
const msgQueue = [];

// GET: /all-messages
router.get("/all-messages", (req, res, next) => {
  res.send({ data: messages });
});

// POST: /send-message
router.post("/send-message", async (req, res, next) => {
  const { to, body } = req.body;
  const patient = messages[to];
  const params = {
    patientFullname: req.body.patientFullname,
    patientInsuranceID: req.body.patientInsuranceID,
    medications: req.body.medications,
    address: patient.address,
  };

  const fileName = await createReceipt(params);
  const receiptUrl = `${cfg.serverUrl}/${fileName}`;
  const pharmacyText =
    "Please, once the medicine are shipped send the tracking number.";

  patient.receiptLink = receiptUrl;

  try {
    const { sid } = await sendMessage(to, body, receiptUrl);
    await sendMessage(cfg.pharmacyPhoneNumber, pharmacyText, receiptUrl);
    res.send({
      status: "success",
      message: `Message sent to ${to}. Message SID: ${sid}`,
    });
    msgQueue.push(to);
  } catch (err) {
    console.error(err);
    res.status(500).send({
      status: "error",
      message: "Failed to send message. Check server logs for more details.",
    });
  }
});

// POST: /receive-message
router.post("/receive-message", async ({ body }, res) => {
  const {
    From: from,
    Body: textMessage,
    Latitude: latitude,
    Longitude: longitute,
  } = body;

  const phoneNumberRegExp = /(?<phoneNum>\+?\d{8,})/;
  const [phoneNumber] = from.match(phoneNumberRegExp);

  // Intercept pharmacy answer
  if (phoneNumber === cfg.pharmacyPhoneNumber) {
    const to = msgQueue.shift();
    const body = `*From Pharmacy*: ${textMessage}`;

    messages[to].isPackageSent = true;

    try {
      const { sid } = await sendMessage(to, body);
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

    return;
  }

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
    const address = `${faker.address.streetAddress(
      "##"
    )} ${faker.address.city()}`;

    const extra = {
      name: faker.name.findName(),
      insuranceId: faker.internet.password(),
      address,
      isPackageSent: false,
    };

    messages[phoneNumber] = { messages: [message], ...geoData, ...extra };
  }
});

module.exports = router;
