const cppaddon = require('./build/Release/cppaddon.node');
const fs = require("fs")

// The function trains a model by a given csv file path and a chosen detector type (Hybrid/Regression)
function TrainModel(csvFilePath,detectorType){
    // Create a detector instance    
    var _addonInstance = new cppaddon.Detector();
    // returns a string of the learned model data
    return _addonInstance.LearnNormal(csvFilePath,detectorType);
}

function DetectAnomalies(csvFilePath,){
    // Create a detector instance    
    var _addonInstance = new cppaddon.Detector();
    var data = fs.readFileSync("test.csv","utf8");
    console.log(data);
    // returns a string of anomalies found
    return _addonInstance.Detect(data,csvFilePath);
}
console.log(DetectAnomalies("./anomaly_flight.csv"));
