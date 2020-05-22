//TODO Set heroku scheduler to run

const path = require("path");
const fs = require("fs");

const dirPath = path.join(__dirname, '/static/maps');
fs.readdir(dirPath, (e, files) => {
  if (e) {
    console.log('Cannot access the folder');
  } else {
    files.forEach(f => {
      fs.unlink(`${dirPath}/${f}`, e => {
        if (e) console.log(e);
      });
    });
  }
})