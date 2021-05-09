/***
 * AnomalyDetector.h
 *
 * Author: Matan Noach, 316441534
 *
 ***/

#ifndef ADVANCEDPROGRAMMING1_ANOMALYDETECTOR_H
#define ADVANCEDPROGRAMMING1_ANOMALYDETECTOR_H

#include <string>
#include <vector>
#include "timeseries.h"
#include "math.h"
#include "minCircle.h"

const double MULT_FACTOR = 1.1;
using namespace std;

/**
 * The struct represents 2 correlated features
 */
struct correlatedFeatures {
    string feature1, feature2;  // names of the correlated features
    float corrlation;
    Line lin_reg;
    float threshold;
    Circle circle = Circle(Point(0, 0), 0);
    bool isCircle = false;
    /**
    * A constructor for a correlatedFeatures struct
    * @param f1 - The first feature
    * @param f2 - The second feature
    * @param cor - The correlation between both features
    * @param array - The array of points representing the correlated features
    * @param size - The array's size
    */
    correlatedFeatures(string f1, string f2, float cor, Point **array, int size, bool isCircle) {
        this->feature1 = move(f1);
        this->feature2 = move(f2);
        this->corrlation = cor;
        // if the cor is bigger than the line threshold, create the feature's correlation shape as line
        if (!isCircle) {
            setLine(array, size);
        } else { // else, create it as circle
            setCircle(array, size);
        }
    }
    /**
     * Linear regression constructor
     **/
    correlatedFeatures(string f1,string f2,float cor,float thresh,float a, float b){
        this->feature1 = move(f1);
        this->feature2 = move(f2);
        this->corrlation = cor;
        this->threshold = thresh;
        this->isCircle = false;
        lin_reg.a=a;
        lin_reg.b=b;
    }
    /**
     * Min circle constructor
     **/
    correlatedFeatures(string f1,string f2,float cor,float thresh,float x,float y, float r){
        this->feature1 = move(f1);
        this->feature2 = move(f2);
        this->corrlation = cor;
        this->threshold = thresh;
        this->isCircle = true;
        this->circle.radius = r;
        Point p(x,y);
        this->circle.center = p;
    }

    /**
     * The function set the correlation shape as line
     * @param array - The array of points representing both features
     * @param size - The array's size
     */
    void setLine(Point **array, int size) {
        this->lin_reg = linear_reg(array, size);
        this->threshold = findMaxDev(array, size, lin_reg) * MULT_FACTOR;
        this->isCircle = false;
    }

    /**
     * The function set the correlation shape as circle
     * @param array - The array of points representing both features
     * @param size - The array's size
     */
    void setCircle(Point **array, int size) {
        this->circle = findMinCircle(array, size);
        this->threshold = this->circle.radius * MULT_FACTOR;
        this->isCircle = true;
    }

    /**
     * The function gets a point and returns the deviation from it the correlated features shape
     * @param p - The point
     * @return The deviation from the point to the correlated features shape
     */
    float getDev(Point p) const {
        // if the shape is circle, return the distance from the center
        if (isCircle) {
            return distance(p, circle.center);
        }
        // else, return the deviation from the line
        return dev(p, this->lin_reg);
    }
};


class AnomalyReport {
public:
    const string description;
    const long timeStep;

    AnomalyReport(string description, long timeStep) : description(description), timeStep(timeStep) {}
};

class TimeSeriesAnomalyDetector {
protected:
    vector<correlatedFeatures> cf;
    double correlationThreshold;
public:
    virtual void learnNormal(const TimeSeries &ts) = 0;

    virtual vector<AnomalyReport> detect(const TimeSeries &ts) = 0;

    /**
     * @return A vector of correlatedFeatures
     */
    vector<correlatedFeatures> getNormalModel() const{
        return cf;
    }
    void setCorrelatedFeatures(vector<correlatedFeatures> newCF){
        this->cf = newCF;
    }

    virtual ~TimeSeriesAnomalyDetector() {}
};

#endif //ADVANCEDPROGRAMMING1_ANOMALYDETECTOR_H
