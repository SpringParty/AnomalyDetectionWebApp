const cppaddon = require('./addons/cppaddon.node')

class Detector {
    constructor(){}
  // The function trains a model by a given csv file path and a chosen detector type (Hybrid/Regression)
  Calculate(normalFile,anomalyFile, detectorType) {
    // Create a detector instance
    var addonInstance = new cppaddon.Detector();
    // returns a string of the learned model data
    return addonInstance.Detect(addonInstance.LearnNormal(normalFile, detectorType),anomalyFile);
  }  
}
module.exports = Detector;
