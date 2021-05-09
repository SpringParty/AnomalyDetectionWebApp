/***
 * HybridAnomalyDetector.h
 *
 * Author: Matan Noach, 316441534
 *
 ***/

#ifndef ADVANCEDPROGRAMMING1_HYBRIDANOMALYDETECTOR_H_
#define ADVANCEDPROGRAMMING1_HYBRIDANOMALYDETECTOR_H_

#include "SimpleAnomalyDetector.h"
#include "minCircle.h"

class HybridAnomalyDetector:public SimpleAnomalyDetector {
    float basicThreshold;
public:
	HybridAnomalyDetector();
	virtual ~HybridAnomalyDetector();
    virtual void checkCreateCorrelatedFeature(float bestPearson, map<string, vector<float>>::iterator iter1, map<string, vector<float>>::iterator bestMatchIter);

};

#endif /* ADVANCEDPROGRAMMING1_HYBRIDANOMALYDETECTOR_H_ */
