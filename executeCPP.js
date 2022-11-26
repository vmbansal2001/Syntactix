const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const executeCpp = (filename) => {
  const jobId = filename.split(".")[0];
  const outFileName = `${jobId}.out`;
  const filepath = path.join("code_files", filename);
  const outFilePath = path.join("code_files", outFileName);

  return new Promise((resolve, reject) => {
    exec(
      `g++ ${filepath} -o ${outFilePath} && ${outFilePath}`,
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

module.exports = executeCpp;