module.exports = (pres => {
  let dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  pres.layout = "LAYOUT_WIDE";
  pres.defineSlideMaster({
      title: "MASTER_SLIDE",
      background: { color: "FFFFFF" },
      objects: [
          { rect: { x: 0.0, y: 0, w: "100%", h: 0.75, fill: { color: "2A2829" } } },
          { text: { 
            text: new Date().toLocaleDateString("en-US", dateOptions), 
            options: { color: "FFFFFF", x: 0, y: 0, w: '100%', align: "center", h: 0.75} 
          }},
          { image: { x: 0.1, y: 0, w: 1.67, h: 0.75, path: "master-slides/media/cka_logo.png" } },
      ],
  });
  //"2A2829" = cka brown
})