const fs = require('fs');
const path = require('path');
const csv = require('csvtojson');
const express = require('express');
const bodyParser = require('body-parser');
const { deepStrictEqual } = require('assert');

const readyStatus = "ready";
const pendingStatus = "pending";
const modelsStatusFile = path.join(__dirname, 'models', 'modelsStatus.csv');
try {    
    // if models file exists
    if (fs.existsSync(modelsStatusFile)) {
        console.log(`${modelsStatusFile} already exists`);
    // if models file does not exist
    } else {
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
                let msgSent = false;
                // for each row in modelsStatus.csv file
                for (let data of modelStatusData) {
                    // if row's model_id equals to the given parameter
                    if (data.model_id == modelID) {
                        msgSent = true;                        
                        return { statusCode: 200, body: { status: data.status } };
                    }
                }
                // if the given model_id does not exist in modelsStatus.csv file
                if (!msgSent) {                    
                    return { statusCode: 404, body: { status: 'does not exist' } };
                }                
            })
            // send response to client
            .then((result) => {
                res.status(result.statusCode).json(result.body);
            })
    // if model_id parameter was not given
    } else {
        res.status(404).json({ status: 'does not exist' });
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
    // parse modelsStatus.csv file
    fs.readFile(modelsStatusFile, 'utf8', function(err, data) {
        if (!err) {
            // get lines of the .csv file, and split them by ','
            let lines = data.split('\n')
            let linesArr = lines.map(line=>line.split(','));
            // filter out the line with the given model_id
            let output = linesArr.filter(line=>line[0] != req.body.post).join("\n");
            
            // if a line was removed
            if (data != output) {
                // remove the relevant line from the .csv file
                fs.writeFileSync(modelsStatusFile, output);
                // remove the file from the directory
                let modelCsvFile = path.join(__dirname, 'models', req.body.post + ".csv");
                                
                // if model's file exist
                if (fs.existsSync(modelCsvFile)) {
                    // delete file from folder
                    fs.unlink(modelCsvFile, (err) => {
                        if (err) console.log(`Could not delete file ${modelCsvFile}. `, err);
                        console.log(`successfully deleted file ${modelCsvFile}`)
                    });
                }

                res.status(200).send();
            } else {
                res.status(404).send();
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
    const modelType = req.query["model_type"];
    
    let modelID = 5467;
    
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

    if (modelType !== "regression" && modelType !== "hybrid") {
        res.status(404).send(`Illegal model type`);
        return;
    } else {
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
        
        // create .csv file for the processed model
        // let modelFile = path.join(__dirname, 'models', req.body.model_id + ".csv");
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