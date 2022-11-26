require('dotenv').config();
const express = require("express");
const fs = require("fs");
const path = require("path")
const executeCpp = require("./executeCPP");
const executeJava = require("./executeJAVA");
const executePy = require("./executePY");
const generateFile = require("./generateFile");
const cors = require('cors')

const app = express();

const PORT = parseInt(process.env.PORT) || 3002;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// app.use(express.static(path.join(__dirname, "../client", "build")));
app.use(express.static(path.join(__dirname, "build")))

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/run", async (req, res) => {
  const api_key = "6ljPpgvkPKWtZcNw1buX";
  if (api_key != req.body.api_key) {
    return res
      .status(401)
      .json({ error: "Permission Denied: Invalid API Key" });
  }

  let language = req.body.language;
  let code = req.body.code;

  if (language === undefined) {
    return res
      .status(400)
      .json({ error: "Language not received" });
  }

  if (code === undefined) {
    return res
      .status(400)
      .json({ language: language, error: "Code not received" });
  }

  try {
    const filename = await generateFile(language, code);
    let output;
    if (language === "cpp") {
      output = await executeCpp(filename);
    } else if (language === "java") {
      output = await executeJava(filename);
    } else if (language === "py") {
      output = await executePy(filename);
    } else {
      fs.unlinkSync(path.join("code_files", filename), (err) => {
        if (err) {
          res.status(500).json({ err });
        }
      });
      return res
        .status(400)
        .json({
          language: language,
          error: "Bad Request: Language not supported",
        });
    }
    return res.json({ filename, output });
  } catch (err) {
    res.status(500).json({ err });
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
