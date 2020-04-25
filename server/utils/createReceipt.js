const nodeHtmlToImage = require("node-html-to-image");
const receiptTemplate = require("../templates/receipt");

module.exports = (receiptData) => {
  const { patientFullname, patientInsuranceID, medications } = receiptData;

  return nodeHtmlToImage({
    output: `public/receipt_${patientInsuranceID}.png`,
    html: receiptTemplate,
    content: {
      createdAt: new Date().toLocaleDateString(),
      dueTo: new Date().toLocaleDateString(),
      patientFullname,
      patientInsuranceID,
      medications,
    },
  });
};
