/***
 * SimpleAnomalyDetector.cpp
 *
 * Author: Matan Noach, 316441534
 *
 ***/
#include "SimpleAnomalyDetector.h"

// documentation in simpleAnomalyDetector.h
SimpleAnomalyDetector::SimpleAnomalyDetector() {
    this->correlationThreshold = 0.9;
}

// documentation in simpleAnomalyDetector.h
SimpleAnomalyDetector::~SimpleAnomalyDetector() {
}

// documentation in simpleAnomalyDetector.h
bool SimpleAnomalyDetector::isCorrelatedFeatureExist(const string &feature1, const string &feature2) {
    // For each correlatedFeatures object, check if there is one that has both feature 1 and feature 2 as names
    for (const correlatedFeatures &correlatedFeatures:this->cf) {
        if ((correlatedFeatures.feature1 == feature1 && correlatedFeatures.feature2 == feature2) ||
            (correlatedFeatures.feature2 == feature1 && correlatedFeatures.feature1 == feature2)) {
            return true;
        }
    }
    return false;
}

/**
 * The function creates a regression line by the 2 vectors of float that represents features, and returns the line
 * @param first - The first vector of values
 * @param second - The second vector of values
 * @return The array of points
 */
Point **getPointsByFeatures(vector<float> first, vector<float> second) {
    int size = first.size();
    //dynamically create a pointer to a new pointer array
    Point **array = new Point *[size];
    for (int i = 0; i < first.size(); i++) {
        array[i] = new Point(first[i], second[i]);
    }
    //return the pointer
    return array;
}
// documentation in simpleAnomalyDetector.h
correlatedFeatures SimpleAnomalyDetector::
createCorrelatedFeatures(map<string, vector<float>>::iterator iter1, map<string, vector<float>>::iterator iter2,
                         float bestPearson, bool isCircle) {
    // get the rows number from iter1
    int arraySize = iter1->second.size();
    // transform the features to an array of points
    Point **array = getPointsByFeatures(iter1->second, iter2->second);
    // create a new struct and return it
    correlatedFeatures c = correlatedFeatures(iter1->first, iter2->first, bestPearson, array, arraySize, isCircle);
    // delete the points array
    delete[] array;
    return c;
}

// documentation in simpleAnomalyDetector.h
void SimpleAnomalyDetector::learnNormal(const TimeSeries &ts) {
    //copy the csv data to a new map
    auto csvData = ts.getCSVData();
    //find the number of rows in the data
    int rowNum = csvData.begin()->second.size();
    // loop with iterators from the beginning to the end
    for (auto iter1 = csvData.begin(); iter1 != csvData.end(); iter1++) {
        float bestPearson = 0;
        auto bestMatchIter = iter1;
        // loop with iterators from the beginning to the end again
        for (auto iter2 = csvData.begin(); iter2 != csvData.end(); iter2++) {
            // for each feature, find the best pearson matching to it.
            float thisPearson = pearson(&iter1->second[0], &iter2->second[0], rowNum);
            // if the iterators are different, this pearson is better than the last one
            // and it is higher than the threshold, mark this iterator as best match and change the best pearson
            if (iter1 != iter2 && abs(thisPearson) > abs(bestPearson)) {
                bestPearson = thisPearson;
                bestMatchIter = iter2;
            }
        }
        // check if it should create a correlated feature struct
        checkCreateCorrelatedFeature(bestPearson, iter1, bestMatchIter);
    }
}

/**
 * The function finds anomalies in a correlated features model by 2 vector of values
 * @param feature1 - The first feature iterator
 * @param feature2 - The second feature iterator
 * @param correlation - The correlatedFeatures struct
 * @return A vector of Anomaly Reports
 */
vector<AnomalyReport>
findAnomalies(map<string, vector<float>>::iterator feature1, map<string, vector<float>>::iterator feature2,
              const correlatedFeatures &correlation) {
    // create a points list by the 2 features
    Point **array = getPointsByFeatures(feature1->second, feature2->second);
    vector<AnomalyReport> reports;
    int arraySize = feature1->second.size();
    // for each point, check if the deviation is greater than the correlation threshold
    for (int i = 0; i < arraySize; i++) {
        // find the deviation for the correlated features
        float deviation = correlation.getDev(*array[i]);
        // if the deviation passes the threshold, create an anomaly  report and push it to the list
        if (deviation > correlation.threshold) {
            AnomalyReport ar(feature1->first + "," + feature2->first, i + 1);
            reports.push_back(ar);
        }
    }
    delete[] array;
    return reports;
}

// documentation in simpleAnomalyDetector.h
vector<AnomalyReport> SimpleAnomalyDetector::detect(const TimeSeries &ts) {
    vector<AnomalyReport> anomalyReports;
    // get the csvData and an iterator to it
    auto csvData = ts.getCSVData();
    auto iter = csvData.begin();
    // for each correlated features:
    for (const correlatedFeatures &features:this->cf) {
        // get an iterator for the correlated features in the map csvData
        auto feature1Iterator = csvData.find(features.feature1);
        auto feature2Iterator = csvData.find(features.feature2);        
        // find the anomalies vector
        vector<AnomalyReport> reports = findAnomalies(feature1Iterator, feature2Iterator, features);
        anomalyReports.reserve(reports.size());
        // add each AnomalyReport to the overall vector
        for (const AnomalyReport &report:reports) {
            anomalyReports.push_back(report);
        }
    }
    // return the anomalies vector
    return anomalyReports;
}

float SimpleAnomalyDetector::getCorrelationThreshold() const {
    return this->correlationThreshold;
}

void SimpleAnomalyDetector::setCorrelationThreshold(float newThreshold) {
    this->correlationThreshold = newThreshold;
}

void SimpleAnomalyDetector::checkCreateCorrelatedFeature(float bestPearson, map<string, vector<float>>::iterator iter1,
                                                         map<string, vector<float>>::iterator bestMatchIter) {
    // if there is a pearson above the detector's correlation threshold,
    // and there isn't a correlated features struct exists with both features
    // than push a new correlated features struct to the vector.
    if (!this->isCorrelatedFeatureExist(iter1->first, bestMatchIter->first) &&
        bestPearson > this->correlationThreshold) {
        this->cf.push_back(createCorrelatedFeatures(iter1, bestMatchIter, bestPearson, false));
    }
}
