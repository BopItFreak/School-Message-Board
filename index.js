const PowerPoint = require("./powerpoint");
let powerPoint = new PowerPoint();
const convertPptxToMp4 = require("./convert-to-video");
const ftpUpload = require("./ftp-upload");

(async () => {
  console.log("Adding Slides...");
  await powerPoint.addSlides()
  console.log("Saving Presentation...");
  await powerPoint.savePresentation();
  console.log("Converting to MP4...");
  await convertPptxToMp4();
  console.log("Uploading to File Server...");
  await ftpUpload();
  console.log("Done!");
})();

Object.defineProperty(Array.prototype, 'chunk', {
  value: function (n) {
      return Array.from(Array(Math.ceil(this.length / n)), (_, i) => this.slice(i * n, i * n + n));
  }
});              