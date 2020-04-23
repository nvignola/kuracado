const nodeHtmlToImage = require("node-html-to-image");
const receiptTemplate = require("../templates/receipt");

module.exports = (receiptData) => {
  const { patientFullname, patientInsuranceID } = receiptData;

  return nodeHtmlToImage({
    output: `.server/receipts/receipt_${patientInsuranceID}.png`,
    html: receiptTemplate,
    content: {
      createdAt: new Date().toLocaleDateString(),
      dueTo: new Date().toLocaleDateString(),
      patientFullname,
      patientInsuranceID,
    },
  });
};
