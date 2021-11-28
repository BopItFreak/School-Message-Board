const Client = require('ftp');
const fs = require('fs');
let c = new Client();

async function ftpUpload() {
  return new Promise ((resolve, reject) => {
    //cringe old module that doesn't support promises.
    c.on('ready', (() => {
      c.put('CKA Message Board.mp4', 'CKA Message Board.mp4', err => {
        if (err) reject(err);
        c.end();
        resolve();
      });
    }));
  
    c.connect(require("./ftp-secret.json"));
  });
}

module.exports = ftpUpload;
