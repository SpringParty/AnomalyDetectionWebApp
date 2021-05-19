const cppaddon = require("./build/Release/cppaddon.node")

class Detector {
    constructor(){}
  // The function trains a model by a given csv file path and a chosen detector type (Hybrid/Regression)
  Calculate(modelFile, anomalyFile, detectorType) {
    // Create a detector instance
    let addonInstance = new cppaddon.Detector();
    
    // returns a string of the learned model data
    return addonInstance.Detect(addonInstance.LearnNormal(modelFile, detectorType), anomalyFile);
  }  
}
let d = new Detector();
console.log(d.Calculate("reg_flight.csv","anomaly_flight.csv","regression"));

