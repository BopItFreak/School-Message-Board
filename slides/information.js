const fetch = require("node-fetch");
const fs = require("fs");
const badjokes = require("./media/badjokes.json");
let badjoke = `${badjokes[Math.floor(Math.random() * badjokes.length)]}`;

//remove joke from badjokes.json
fs.writeFileSync("slides/media/badjokes.json", JSON.stringify(badjokes.filter(j => j !== badjoke)));

function dateToWeekAndDayOfMonth(dateString) {
  let date = new Date(dateString);
  let dateMap = {
    0: "Mon",
    1: "Tue",
    2: "Wed",
    3: "Thu",
    4: "Fri",
    5: "Sat",
    6: "Sun"
  }
  return `${dateMap[date.getDay()]} ${date.getDate() + 1}`;
}

let addInfoSlides = (async pp => {
  let slide = pp.pres.addSlide("MASTER_SLIDE");

  // weather
  let weatherObj = await (await fetch("https://api.weatherbit.io/v2.0/forecast/daily?units=I&city=Stamford,CT&key=ced16243ce7d4807b77fa6e33003bd25")).json();

  //I should make this into a for loop
  let weatherCells = [
		[
      { text: dateToWeekAndDayOfMonth(weatherObj.data[0].datetime), options: { valign: "top", align: "center", bold: true}}, 
      { text: dateToWeekAndDayOfMonth(weatherObj.data[1].datetime), options: { valign: "top", align: "center", bold: true}}, 
      { text: dateToWeekAndDayOfMonth(weatherObj.data[2].datetime), options: { valign: "top", align: "center", bold: true}}, 
      { text: dateToWeekAndDayOfMonth(weatherObj.data[3].datetime), options: { valign: "top", align: "center", bold: true}}, 
      { text: dateToWeekAndDayOfMonth(weatherObj.data[4].datetime), options: { valign: "top", align: "center", bold: true}}, 
      { text: dateToWeekAndDayOfMonth(weatherObj.data[5].datetime), options: { valign: "top", align: "center", bold: true}}, 
      { text: dateToWeekAndDayOfMonth(weatherObj.data[6].datetime), options: { valign: "top", align: "center", bold: true}}
    ],
	];

  //add weather cells
	slide.addTable(weatherCells, {
		//x: 0.5,
		y: 1.1,
		rowH: [1.75],
		colW: [1.75, 1.75, 1.75, 1.75, 1.75, 1.75, 1.75],
		fill: { color: "D3272F" }, //cka red
		color: "FFFFFF", 
		fontSize: 14,
		valign: "center",
		align: "center",
		border: { pt: "1", color: "2A2829" },
	});

  for (let i = 0; i < 7; i++) {
    // weather text
    slide.addText(`${weatherObj.data[i].high_temp}°/${weatherObj.data[i].low_temp}°`, {
      //breakLine: true, 
      x: 1 + (i == 0 ? 0 : (i * 1.75)), 
      y: 1, 
      w: 12, 
      h: 1.1, 
      margin: 10, 
      fontSize: 12, 
      color: "FFFFFF", 
    });
    slide.addText(`${weatherObj.data[i].pop}%`, {
      //breakLine: true, 
      x: 1 + (i == 0 ? 0 : (i * 1.75)), 
      y: 1.4, 
      w: 12, 
      h: 1.1, 
      margin: 10, 
      fontSize: 12, 
      color: "FFFFFF", 
    });
    slide.addText(`${weatherObj.data[i].rh}%`, {
      //breakLine: true, 
      x: 1 + (i == 0 ? 0 : (i * 1.75)), 
      y: 1.8, 
      w: 12, 
      h: 1.1, 
      margin: 10, 
      fontSize: 12, 
      color: "FFFFFF", 
    });

    // weather images
    slide.addImage({x: .50 + (i == 0 ? 0 : (i * 1.75)), y: 1.4, w: .5, h: .35, path: "slides/media/weather/thermo.png"})
    slide.addImage({x: .60 + (i == 0 ? 0 : (i * 1.75)), y: 1.8, w: .35, h: .35, path: "slides/media/weather/rain.png"})
    slide.addImage({x: .60 + (i == 0 ? 0 : (i * 1.75)), y: 2.2, w: .35, h: .25, path: "slides/media/weather/humidity.png"})
  }

  let today = new Date();
  let june15th = new Date(today.getFullYear() + 1, 05, 15);
  let dec19th = new Date(today.getFullYear(), 11, 19);
  let one_day = 1000*60*60*24;
  let daysTillEndOfSchoolYear = Math.ceil((june15th.getTime()-today.getTime())/(one_day))
  let daysTillChristmasBreak = Math.ceil((dec19th.getTime()-today.getTime())/(one_day))

  // days until good dates
  slide.addText([
    {
      text: `${daysTillEndOfSchoolYear} days until summer break!`,
      options: { breakLine: true }
    },
    {
      text: `${daysTillChristmasBreak} days until Christmas break!`
    },
  ], {
    x: 0.5, y: 3.0, w: 4, h: 4, margin: 4, fontSize: 22,
    color: "393939",
    lineSpacing: 99,
    valign: "top",
    glow: { size: 10, opacity: 0.25, color: "D3272F"},
    fill: { color: "fffccc" }
  });

  // bad pun of the day :)

  slide.addText("Joke Of The Day", {
    bold: true,
    fontSize: 30,
    x: 7.3,
    y: 3.2
  })
  
  slide.addText([
    {
      text: badjoke,
    },
  ], {
    x: 6.3, y: 3.5, w: 5, h: 3, margin: 4, fontSize: 22,
    color: "393939",
    //lineSpacing: 99,
    valign: "center",
    align: "center",
    fill: { color: "fffccc" }
  });
});

module.exports = (async pp => {
  //more time
  for (let i = 0; i < 3; i++)
    await addInfoSlides(pp);
});