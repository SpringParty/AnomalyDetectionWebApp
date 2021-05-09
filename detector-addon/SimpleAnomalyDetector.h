/***
 * SimpleAnomalyDetector.h
 *
 * Author: Matan Noach, 316441534
 *
 ***/

#ifndef ADVANCEDPROGRAMMING1_SIMPLEANOMALYDETECTOR_H
#define ADVANCEDPROGRAMMING1_SIMPLEANOMALYDETECTOR_H

#include "anomaly_detection_util.h"
#include "AnomalyDetector.h"
#include <utility>
#include <vector>
#include <algorithm>
#include <string.h>
#include <math.h>
#include "minCircle.h"

using namespace std;
/**
 * The class represents a simple anomaly detector model
 */
class SimpleAnomalyDetector : public TimeSeriesAnomalyDetector {
public:
    /**
     * Default constructor
     */
    SimpleAnomalyDetector();

    /**
     * Default destructor
     */
    virtual ~SimpleAnomalyDetector();

    /**
    * The function calculates the initial normal data by time series object
    * @param ts The time series object
    */
    virtual void learnNormal(const TimeSeries &ts);

    /**
     * The function gets a time series object and returns
     * a vector of Anomaly Reports found in relation to the detector model
     * @param ts - The time series
     * @return A vector of AnomalyReports
     */
    virtual vector<AnomalyReport> detect(const TimeSeries &ts); 

    /**
     * The function gets 2 feature names and checks if there is a
     * correlated feature object in the vector that matches them
     * @param feature1 - The first feature's name
     * @param feature2 - The second feature's name
     * @return True if there is a correlatedFeatures object and false otherwise
     */
    bool isCorrelatedFeatureExist(const string &feature1, const string &feature2);

    /**
     * @return The line threshold
     */
    float getCorrelationThreshold() const;

    /**
     * The function replaces the line threshold with a new one
     * @param newThreshold - The new threshold
     */
    void setCorrelationThreshold(float newThreshold);

    /**
     * The function checks gets best pearson and 2 iterators for csvData, and chekcs
     */
    virtual void checkCreateCorrelatedFeature(float bestPearson, map<string, vector<float>>::iterator iter1,
                                              map<string, vector<float>>::iterator bestMatchIter);

    /**
    * The function gets 2 iterators of csvData map that represents 2 features, and a best pearson,
    * and returns a correlatedFeatures struct by them
    * @param iter1 - The first feature
    * @param iter2 - The second feature
    * @param bestPearson - The best pearson calculated for both of them
    * @param isCircle - true if the correlation shape is circle and false otherwise
    * @return a correlated feature struct of both of them
    */
    static correlatedFeatures
    createCorrelatedFeatures(map<string, vector<float>>::iterator iter1, map<string, vector<float>>::iterator iter2,
                             float bestPearson, bool isCircle);
};


#endif //ADVANCEDPROGRAMMING1_SIMPLEANOMALYDETECTOR_H
