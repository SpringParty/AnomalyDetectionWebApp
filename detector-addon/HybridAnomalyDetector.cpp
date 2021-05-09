/***
 * HybridAnomalyDetector.cpp
 *
 * Author: Matan Noach, 316441534
 *
 ***/
#include "HybridAnomalyDetector.h"

HybridAnomalyDetector::HybridAnomalyDetector() {
    this->basicThreshold = 0.5;
}

HybridAnomalyDetector::~HybridAnomalyDetector() {
}

void HybridAnomalyDetector::checkCreateCorrelatedFeature(float bestPearson, map<string, vector<float>>::iterator iter1,
                                                         map<string, vector<float>>::iterator bestMatchIter) {
    bool isCircle;
    // check if the pearson is above the basic threshold
    if (bestPearson > this->basicThreshold) {
        float lineThreshold = this->correlationThreshold;
        // check if the pearson is good enough for circle or not
        if (bestPearson > lineThreshold) {
            isCircle = false;
        } else {
            isCircle = true;
        }
        // and there isn't a correlated features struct exists with both features
        // than push a new correlated features struct to the vector.
        if (!this->isCorrelatedFeatureExist(iter1->first, bestMatchIter->first)) {
            this->cf.push_back(
                    SimpleAnomalyDetector::createCorrelatedFeatures(iter1, bestMatchIter, bestPearson, isCircle));
        }
    }
}

