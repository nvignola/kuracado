const nodeHtmlToImage = require("node-html-to-image");
const receiptTemplate = require("../templates/receipt");

module.exports = (receiptData) => {
  const { patientFullname, patientInsuranceID, medications } = receiptData;
  const fileName = `receipt_${patientInsuranceID}.png`;

  return nodeHtmlToImage({
    output: `public/${fileName}`,
    html: receiptTemplate,
    content: {
      createdAt: new Date().toLocaleDateString(),
      dueTo: new Date().toLocaleDateString(),
      patientFullname,
      patientInsuranceID,
      medications,
    },
  }).then(() => fileName);
};
