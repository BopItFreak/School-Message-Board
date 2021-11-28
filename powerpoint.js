const PptxGenJS = require("pptxgenjs");
const fs = require("fs/promises");
const util = require("util");
const exec = util.promisify(require('child_process').exec);

class PowerPoint {
  constructor() {
    this.pres = new PptxGenJS();
    this.slides = [];
    this.ckaTemplate = require("./master-slides/cka")(this.pres);
  }
  async addSlides() {
    let slidesNames = (await fs.readdir("./slides"));  
    for (let slideName of slidesNames) {
      if (slideName !== "media")
        this.slides.push(await require(`./slides/${slideName}`)(this));
    }
  }
  async savePresentation() {
    await this.pres.writeFile({fileName: `Message Board (initial).pptx`});
    await this.combinePresentations();
  }
  //add custom made slides to the presentation
  async combinePresentations() {
    try {
      await fs.stat('./Additional Slides.pptx')
      await exec('python ./MergePPT.py')
    } catch {
      await fs.rename("./Message Board (initial).pptx", "./Message Board.pptx")
      console.log("'Additional Slides.pptx' does not exist, no merge needed.")
    }
  }
}
module.exports = PowerPoint;




