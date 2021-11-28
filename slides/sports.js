const fs = require("fs/promises");

module.exports = (async pp => {
  let sportsUpdateText = await fs.readFile("slides/media/sports.txt", "utf8");
  if (!sportsUpdateText) { return; }

  let generateSlide = (async () => {
    let slide = pp.pres.addSlide("MASTER_SLIDE");
    slide.addText([{
      text: "🏀 SPORTS UPDATES 🏀"
    }, ], {
      color: "393939", x: 0, y: 0.9, w: '100%', align: "center", h: 0.75, fontSize: 52
    });
    
    slide.addText(sportsUpdateText, {
      x: .5,
      y: .4,
      w: 13,
      h: 8,
      fontSize: 30,
      fit: "resize"
    });
    /*
    slide.addImage({
      x: 3,
      y: 4,
      w: 1,
      h: 1,
      path: "slides/media/PogChamp.png"
    });*/
  });

  //3 times for more time to read.
  for (let i = 0; i < 3; i++) {
    generateSlide();
  }
  
});


