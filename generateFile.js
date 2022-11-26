const path = require('path');
const fs = require('fs');
const { v4: uuid } = require('uuid');

const fileDirName = path.join(__dirname, "code_files");

if (!fs.existsSync(fileDirName)) {
    fs.mkdirSync(fileDirName, { recursive: true });
}

const generateFile = async (format, code) => {
    const jobId = uuid();
    const filename = `${jobId}.${format}`;
    const filepath = path.join(fileDirName, filename);
    fs.writeFileSync(filepath, code);
    return filename;
};

module.exports = generateFile;