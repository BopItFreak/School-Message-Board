const fs = require('fs/promises');

module.exports = (async pp => {
  let promUpdateText = await fs.readFile("slides/media/prom.txt", "utf8");
  if (!promUpdateText) { return; }

  let generateSlide = (() => {
    let slide = pp.pres.addSlide("MASTER_SLIDE");
    slide.addText([{
      text: "PROM UPDATES"
    }, ], {
      color: "393939", x: 0, y: 0.9, w: '100%', align: "center", h: 0.75, fontSize: 52
    });   
    slide.addText(promUpdateText, {
      x: .5,
      y: .4,
      w: 13,
      h: 8,
      fontSize: 30,
      fit: "resize"
    });
  });

  //3 times for more time to read.
  for (let i = 0; i < 3; i++) {
    generateSlide();
  }
  
});