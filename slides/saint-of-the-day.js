const fetch = require("node-fetch");
let $ = require("cheerio");

module.exports = (async pp => {
  let siteRoot = "https://www.catholic.org";

  //Step 1 get saint of the day, and get the id and the read more url.
  let softdText = await (await fetch(`https://www.catholic.org/saints/sofd.php`)).text();
  $ = $.load(softdText);

  //of course, the website isn't always consistent...
  let readMoreBase = $("#saintsSofd > a:nth-child(1)").attr("href");
  if (!readMoreBase) {
    readMoreBase = $("#saintsSofd > p:nth-child(2) > a").attr("href");
    console.log(readMoreBase)
  }
  let saintId = readMoreBase.split("saint_id=")[1];
  let readMoreUrl = siteRoot + readMoreBase;

  //Step 2 get new saint of the day text that's longer.
  softdText = await (await fetch(readMoreUrl)).text();
  $ = $.load(softdText);
  let img = $("#saintContent > img").attr("data-src");
  let imgSrc = siteRoot + img;

  let sofdTextForBoard = $("#saintContent > p").text();
  let saintName = $("#content > h1").text();

  let sentences = sofdTextForBoard.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");
  let sentenceBlocks = sentences.chunk(5).splice(0, 3);

  //Step 3: get the saint's info.  
  let saintPatron = $("#saintYoutube").text().replaceAll("\t", "").split("\n").find(f => f.includes("Patron"));
  let saintBirth = $("#saintYoutube").text().replaceAll("\t", "").split("\n").find(f => f.includes("Birth"));
  let saintDeath = $("#saintYoutube").text().replaceAll("\t", "").split("\n").find(f => f.includes("Death"));
  saintPatron = saintPatron?.length ? saintPatron + "\n" : "";
  saintBirth = saintBirth?.length ? saintBirth + "\n" : "";
  saintDeath = saintDeath?.length ? saintDeath + "\n" : "";
  let saintInfoText = `${saintPatron}${saintBirth}${saintDeath}`;

  //Step 4: paste in the info into the slide.
  for (let sentenceBlock of sentenceBlocks) {
    let sentenceBlockText = sentenceBlock.join(" ");
    //2 times for more time
    for (let i = 0; i < 2; i++) {
      let slide = pp.pres.addSlide("MASTER_SLIDE");

      //saint image and text
      slide.addText(`Saint Of The Day: ${saintName}!`, {
        x: .85,
        y: 1,
        w: 6,
        h: 0,
        fontSize: 18
      });
      slide.addImage({
        x: .5,
        y: 1.4,
        w: 4,
        h: 4,
        path: img ? imgSrc : null
      });
      slide.addText(sentenceBlockText, {
        x: 6.5,
        y: .6,
        w: 6,
        h: 6,
        fontSize: 20,
        fit: "resize"
      });

      //saint info
      slide.addText([{
        text: saintInfoText
      }, ], {
        x: .5,
        y: 5.7,
        w: 4,
        h: 1.6,
        margin: 4,
        fontSize: 22,
        color: "393939",
        //lineSpacing: 99,
        valign: "center",
        align: "center",
        fill: {
          color: "fffccc"
        }
      });
    }
  }

});