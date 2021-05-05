const fs = require('fs');
const path = require('path');
const csv = require('csvtojson');
const express = require('express');
const bodyParser = require('body-parser');
const cppaddon = require('./addons/cppaddon.node')

const readyStatus = "ready";
const pendingStatus = "pending";
const modelsDir = path.join(__dirname, 'models');
const modelsStatusFile = path.join(__dirname, 'models', 'modelsStatus.csv');

function Detector(filePath){
    this.detector = function(str){
        return _addonInstance.learnNormal(str);
    }
    var _addonInstance = new cppaddon.Detector();
    console.log(_addonInstance.learnNormal(filePath));
}
module.exports = Detector;
const instance = new Detector("./reg_flight.csv");

try {
    // if models file exists
    if (fs.existsSync(modelsStatusFile)) {
        console.log(`${modelsStatusFile} already exists`);
    // if models file does not exist
    } else {
        // if models folder does not exist
        if (!fs.existsSync(modelsDir)) {
            fs.mkdirSync(modelsDir);
            console.log(`Created ${modelsDir}`);
        }
        // try to create the file
        fs.writeFile(modelsStatusFile, 'model_id,upload_time,status\n', 'utf8', function(err) {
            if (err) return console.log(err);
            console.log(`Created ${modelsStatusFile}`);
        });
    }
} catch (err) {
    console.error(err);
}


const port = 5000;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/model', (req, res) => {
    const modelID = req.query["model_id"];
    // if model_id parameter was given
    if (modelID) {
        // parse rows of modelsStatus.csv file
        csv()
            .fromFile(modelsStatusFile)
            .then((modelStatusData) => {
                // for each row in modelsStatus.csv file
                for (let data of modelStatusData) {
                    // if row's model_id equals to the given parameter
                    if (data.model_id == modelID) {
                        return { statusCode: 200, body: { status: data.status } };
                    }
                }
                // if the given model_id does not exist in modelsStatus.csv file
                return { statusCode: 404, body: { status: 'model_id does not exist' } };
                
            })
            // send response to client
            .then((result) => {
                res.status(result.statusCode).json(result.body);
            })
    // if model_id parameter was not given
    } else {
        res.status(404).json({ status: 'model_id was not specified' });
    }
});

app.get('/api/models', (req, res) => {
    csv()
        .fromFile(modelsStatusFile)
        .then((modelStatusData) => {
            return { statusCode: 200, body: { models: modelStatusData } };
        })
        // send response to client
        .then((result) => {
            res.status(result.statusCode).json(result.body);
        })
})


app.delete('/api/model', (req, res) => {
    let model_id = req.query["model_id"];
    // parse modelsStatus.csv file
    fs.readFile(modelsStatusFile, 'utf8', function(err, data) {
        if (!err) {
            // get lines of the .csv file, and split them by ','
            let lines = data.split('\n')
            let linesArr = lines.map(line=>line.split(','));
            // filter out the line with the given model_id
            let output = linesArr.filter(line=>line[0] != model_id).join("\n");
            
            // if a line was removed
            if (data != output) {
                // remove the relevant line from the .csv file
                fs.writeFileSync(modelsStatusFile, output);
                // remove the file from the directory
                let modelCsvFile = path.join(__dirname, 'models', model_id + ".csv");
                                
                // if model's file exist
                if (fs.existsSync(modelCsvFile)) {
                    // delete file from folder
                    fs.unlink(modelCsvFile, (err) => {
                        if (err) console.log(`Could not delete file ${modelCsvFile}. `, err);
                        console.log(`successfully deleted file ${modelCsvFile}`)
                    });
                }

                res.status(200).send(`Deleted model_id ${model_id}`);
            } else {
                res.status(404).send(`model_id ${model_id} does not exist`);
            }
        } else {
            res.status(404).send();
        }
    }, res);

    res.send(
        `I received your POST request. This is what you sent me: ${req.body.post}`,
    );
});


app.post('/api/model', (req, res) => {    
    let modelID = new Date().getTime();
    
    const modelType = req.query["model_type"];
    if (modelType !== "regression" && modelType !== "hybrid") {
        res.status(404).send(`Illegal model type`);
        return;
    } else {
        
        // caclulate uploadTime
        let uploadedTime = new Date();
        let uploadedTimeZone = uploadedTime.toString().match(/([-\+][0-9]+)\s/)[1];
        uploadedTimeZone = [uploadedTimeZone.slice(0, 3), ".", uploadedTimeZone.slice(3)].join('');
        uploadedTime = `${uploadedTime.getFullYear().toString().padStart(4, '0')}-` + 
                    `${(uploadedTime.getMonth()+1).toString().padStart(2, '0')}-` +
                    `${uploadedTime.getDate().toString().padStart(2, '0')}T` +
                    `${uploadedTime.getHours().toString().padStart(2, '0')}:` +
                    `${uploadedTime.getMinutes().toString().padStart(2, '0')}:` +
                    `${uploadedTime.getSeconds().toString().padStart(2, '0')}` +
                    `${uploadedTimeZone}`;
        
        
        // append pending model into modelStatus.csv file
        fs.appendFile(modelsStatusFile, `${modelID},${uploadedTime},${pendingStatus}\n`, function(err) {
            if (err) console.error(err);
            console.log('Entered new record into modelStatus.csv');
        });

        let correlatedData = null;

        if (modelType === "regression") {
            console.log("regression model type");
            
            //TODO: call dll of regression algorithm, and insert correlatedFeatures data into correlatedData
        } else {
            console.log("hybrid model type");

            //TODO: call dll of hybrid algorithm, and insert correlatedFeatures data into correlatedData
        }
        
        // //create .csv file for the processed model
        // let modelFile = path.join(__dirname, 'models', model_id + ".csv");
        // fs.writeFile(modelFile, correlatedData, 'utf8', function(err) {
        //     if (err) return console.log(err);
        //     console.log(`Created ${modelFile}`);
        // });

        // set model status as ready
        fs.readFile(modelsStatusFile, 'utf8', function(err, data) {
            if (!err) {
                // get lines of the .csv file, and split them by ','
                let lines = data.split('\n')
                let linesArr = lines.map(line=>line.split(','));
                
                for (line of linesArr) {
                    // if the current row is related to the current modelID
                    if (line[0] == modelID) {                        
                        // change the status of the model
                        line[2] = readyStatus;                        
                        break;
                    }
                }
                // upload the changes into modelsStatus.csv file
                let output = linesArr.join("\n");
                fs.writeFileSync(modelsStatusFile, output);
            } else {
                res.status(404).send();
            }            
        }, res, modelID, readyStatus);
    }

    console.log(`model ${modelID} was created`);
    res.status(200).send(`model ${modelID} was created`);
});

app.listen(port, () => console.log(`Listening on port ${port}`));