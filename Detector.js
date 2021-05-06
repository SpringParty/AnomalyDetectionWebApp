const cppaddon = require('./addons/cppaddon.node')

class Detector {
    constructor(){}
  // The function trains a model by a given csv file path and a chosen detector type (Hybrid/Regression)
  TrainModel(csvFilePath, detectorType) {
    // Create a detector instance
    var _addonInstance = new cppaddon.Detector();
    // returns a string of the learned model data
    return _addonInstance.LearnNormal(csvFilePath, detectorType);
  }

  DetectAnomalies(csvFilePath, modelData) {
    // Create a detector instance
    var _addonInstance = new cppaddon.Detector();
    // returns a string of anomalies found
    return _addonInstance.Detect(modelData, csvFilePath);
  }
}
module.exports = Detector;
