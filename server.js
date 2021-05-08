const fs = require('fs');
const path = require('path');
const cors = require('cors');
const csv = require('csvtojson');
const express = require('express');
const fileupload = require("express-fileupload");
const bodyParser = require('body-parser');
const Detector = require("./Detector.js");

const readyStatus = "ready";
const pendingStatus = "pending";
const modelsDir = path.join(__dirname, "models");
const modelsStatusFile = path.join(__dirname, "models", "modelsStatus.csv");

// example of how to call the detector
// var d = new Detector();
// console.log(d.Calculate("./reg_flight.csv","./anomaly_flight.csv","regression"))

// if models folder does not exist
try {
    if (!fs.existsSync(modelsDir)) {
        fs.mkdirSync(modelsDir);
        console.log(`Created ${modelsDir}`);
    }
} catch (err) {
    console.error(err);
}




try {
  // if models file exists
  if (fs.existsSync(modelsStatusFile)) {
    console.log(`${modelsStatusFile} already exists`);
    // if models file does not exist
  } else {
    // if models folder does not exist
    
    // try to create the file
    fs.writeFile(
      modelsStatusFile,
      "model_id,upload_time,status\n",
      "utf8",
      function (err) {
        if (err) return console.log(err);
        console.log(`Created ${modelsStatusFile}`);
      }
    );
  }
} catch (err) {
  console.error(err);
}

const PORT = 8080;
const app = express();
const buildPath = __dirname + "/build";
app.use(express.static(buildPath));

var corsOptions = {
  origin: "http://localhost:" + PORT,
};
app.use(cors(corsOptions));
app.use(fileupload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// homepage
app.get('/', (req, res) => {
    res.send(buildPath + "index.html");
});

// POST command of detect
app.post("/api/detect", (req, res) => {
    const modelType = req.query["model_type"];
    if (modelType !== "regression" && modelType !== "hybrid") {
        res.status(404).send(`Illegal model type`);
        return;
    } else {
        let modelID = new Date().getTime();

        if (!req.files.model) {
            res.status(404).send(`model file was not specified`);
            return;
        }

        if (req.files.model.length > 1) {
            res.status(404).send(`please specify only 1 model file`);
            return;
        }
    
        if (!req.files.anomaly) {
            res.status(404).send(`anomaly file was not specified`);
            return;
        }

        if (req.files.anomaly.length > 1) {
            res.status(404).send(`please specify only 1 anomaly file`);
            return;
        }

        const modelData = req.files.model.data.toString('utf8');
        const anomalyData = req.files.anomaly.data.toString('utf8');

        const modelFile = path.join(modelsDir, "model-" + modelID + ".csv");
        const anomalyFile = path.join(modelsDir, "anomaly-" + modelID + ".csv");

        createCsvFile(modelFile, modelData);
        createCsvFile(anomalyFile, anomalyData);

        // if modelType is regression
        if (modelType == "regression") {

        // if modelType is hybrid
        } else {

        }

        // delete uploaded csv files
        deleteCsvFile(modelFile);
        deleteCsvFile(anomalyFile);
    }

    res.status(200).send();
});
    

function createCsvFile(filePath, fileData) {
    try {
        fs.writeFileSync(filePath, fileData, "utf8");
        console.log(`Successfully created file ${filePath}`);
    } catch(err) {
        return console.log(err);
    }
}


function deleteCsvFile(filePath) {
    if (fs.existsSync(filePath)) {
        // delete file from folder
        fs.unlink(filePath, (err) => {
            if (err) console.log(`Could not delete file ${filePath}. `, err);
            console.log(`successfully deleted file ${filePath}`);
        });
    }
}


app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
