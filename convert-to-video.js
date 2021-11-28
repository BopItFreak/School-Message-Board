let path = require('path');
const fs = require("fs");
let powerpoint = require('office-script').powerpoint;
let videoName = "CKA Message Board.mp4"

//Create a new instance of PowerPoint and try to open the presentation
async function convertPptxToMp4() {
  return new Promise((resolve, reject) => {
    powerpoint.open(path.join(__dirname, 'Message Board.pptx'), function(err, presentation) {
      if(err) throw err;
      //delete file
      if (fs.existsSync(videoName))
        fs.unlinkSync(videoName);
      //save video as mp4
      presentation.saveAs({name: path.join(__dirname, videoName), type: 'mp4'});  
      //wait till powerpoint is done doing its thing (callback doesn't fire at the right time)
      let interval = setInterval(() => {
        if (fs.statSync(videoName).size !== 0) {
          clearInterval(interval);
          powerpoint.quit();
          resolve();
        }
      },1000);  
    });
  });
  
}

module.exports = convertPptxToMp4;