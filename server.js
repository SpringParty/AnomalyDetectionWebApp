const fs = require("fs");
const path = require("path");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const fileupload = require("express-fileupload");
const Detector = require("./Detector.js");

// const modelsDir = "C:\\Users\\user\\Documents\\University\\Test\\models";
const modelsDir = path.join(__dirname, "models");
// if models folder does not exist
try {
  if (!fs.existsSync(modelsDir)) {
    fs.mkdirSync(modelsDir);    
  }
} catch (err) {
  console.error(err);
}

const PORT = 8080;
const app = express();
const buildPath = __dirname + "/build";
app.use(express.static(buildPath));

const corsOptions = {
origin: "http://localhost:" + PORT,
};
app.use(cors(corsOptions));
app.use(fileupload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// homepage
app.get("/", (req, res) => {
  res.send(buildPath + "index.html");
});

// POST command of detect
app.post("/api/detect", (req, res) => {
  let data = [];

  const modelType = req.query["model_type"];
  
  // if no correct modelType was specified
  if (modelType !== "regression" && modelType !== "hybrid") {
    res
      .status(422)
      .send(
        `please specify model_type from the following options: regression, hybrid`
      );
    return;
  } else {
    let modelID = new Date().getTime();
    // if no model file was specified, send Unprocessable Entity status code
    if (!req.files.model) {
      res.status(422).send(`model file was not specified`);
      return;
    }

    // if more than 1 model file was specified, send Unprocessable Entity status code
    if (req.files.model.length > 1) {
      res.status(422).send(`please specify only 1 model file`);
      return;
    }

    // if no anomaly file was specified, send Unprocessable Entity status code
    if (!req.files.anomaly) {
      res.status(422).send(`anomaly file was not specified`);
      return;
    }

    // if more than 1 anomaly file was specified, send Unprocessable Entity status code
    if (req.files.anomaly.length > 1) {
      res.status(422).send(`please specify only 1 anomaly file`);
      return;
    }

    // upload csv files to project's directory
    const modelData = req.files.model.data.toString("utf8");
    const anomalyData = req.files.anomaly.data.toString("utf8");

    const modelFile = path.join(modelsDir, "model-" + modelID + ".csv");
    const anomalyFile = path.join(modelsDir, "anomaly-" + modelID + ".csv");

    createCsvFile(modelFile, modelData);
    createCsvFile(anomalyFile, anomalyData);

    // detect anomalies
    detector = new Detector();
    detectedData = detector.Calculate(modelFile, anomalyFile, modelType);

    // parse anomalies into array of json
    detectedData = detectedData.split("\n");
    for (i = 0; i < detectedData.length - 1; i++) {
      line = detectedData[i].replace("[", "").replace("]", "").split(",");
      line = {
        feature: line[0],
        corrFeature: line[1],
        fromLine: line[2],
        toLine: line[3],
      };
      data.push(line);
    }

    // delete uploaded csv files
    deleteCsvFile(modelFile);
    deleteCsvFile(anomalyFile);
  }

  res.status(200).send(data);
});

/**
 * upload csv file into the server's directory
 * @param {*} filePath - where the file should be uploaded to.
 * @param {*} fileData - the content to write into the file.
 * @returns None.
 */
function createCsvFile(filePath, fileData) {
  try {
    fs.writeFileSync(filePath, fileData, "utf8");    
  } catch (err) {
    return console.error(err);
  }
}

/**
 * delete csv file from server's directory
 * @param {*} filePath - where the file should be deleted from.
 */
function deleteCsvFile(filePath) {
  if (fs.existsSync(filePath)) {
    // delete file from folder
    fs.unlink(filePath, (err) => {
      if (err) console.err(`Could not delete file ${filePath} from server.`, err);
    });
  }
}

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
