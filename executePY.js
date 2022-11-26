const { exec } = require("child_process"); // can also use spawn
const fs = require("fs");
const path = require("path");

const executePy = (filename) => {
  const filepath = path.join("code_files", filename);

  return new Promise((resolve, reject) => {
    exec(
      `python ${filepath}`,
      (error, stdout, stderr) => {
        if (error) {
          reject({ error, stderr });
        }
        if (stderr) {
          reject({ stderr });
        }
        resolve(stdout);
      }
    );
  });
};

module.exports = executePy;