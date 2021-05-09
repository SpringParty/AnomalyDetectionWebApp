/***
 * anomaly_detection_util.cpp
 *
 * Author: Matan Noach, 316441534
 *
 ***/
#include "anomaly_detection_util.h"
#include <iostream>
#include "cmath"

using namespace std;

// documentation in anomaly_detection_util.h
float distance(Point p1, Point p2) {
    float x = (p1.x - p2.x) * (p1.x - p2.x);
    float y = (p1.y - p2.y) * (p1.y - p2.y);
    return sqrt(x + y);
}

/**
 * The function calculates the average of a float array where each element is in a power
 * @param x - A pointer for the array
 * @param size - The array's size
 * @param power - The power to add
 * @return The average in power
 */
float averageInPower(float *x, int size, int power) {
    float sum = 0;
    // sum all elements raised by a power and divide by their number. return the average
    for (int i = 0; i < size; i++) {
        sum += pow(x[i], power);
    }
    return sum / size;
}


// documentation in anomaly_detection_util.h
float var(float *x, int size) {
    // calculate the average of the array
    float average = averageInPower(x, size, 1);
    // calculate the average of the array where each variable is in power 2
    float averageInSquare = averageInPower(x, size, 2);
    // return the variance
    return averageInSquare - pow(average, 2);
}

// documentation in anomaly_detection_util.h
float cov(float *x, float *y, int size) {
    // calculate the average of both arrays
    float xAverage = averageInPower(x, size, 1);
    float yAverage = averageInPower(y, size, 1);
    // calculate the covariance and return it
    float multSum = 0;
    for (int i = 0; i < size; i++) {
        multSum += (x[i] - xAverage) * (y[i] - yAverage);
    }
    return multSum / size;
}

// documentation in anomaly_detection_util.h
float pearson(float *x, float *y, int size) {
    float covariance = cov(x, y, size);
    // get the square root of a population variance
    float varRootX = sqrt(var(x, size));
    float varRootY = sqrt(var(y, size));
    return covariance / (varRootX * varRootY);
}

// documentation in anomaly_detection_util.h
Line linear_reg(Point **points, int size) {
    float* x = new float[size];
    float* y = new float[size];
    // fill arrays by the given points
    for (int i = 0; i < size; i++) {
        x[i] = points[i]->x;
        y[i] = points[i]->y;
    }
    // calculate the line's a and b and return it
    float a = cov(x, y, size) / var(x, size);
    float b = averageInPower(y, size, 1) - a * averageInPower(x, size, 1);
    return Line(a, b);
}

// documentation in anomaly_detection_util.h
float dev(Point p, Point **points, int size) {
    Line l = linear_reg(points, size);
    return dev(p, l);
}

// documentation in anomaly_detection_util.h
float dev(Point p, Line l) {
    return abs(p.y - l.f(p.x));
}
// documentation in anomaly_detection_util.h
float findMaxDev(Point** array, int size,Line reg){
    float maxDev=0;
    // find the maxDeviation between the points array and the line
    for (int i = 0; i < size; i++) {
        float deviation = dev(*array[i], reg);
        if (deviation > maxDev) {
            maxDev = deviation;
        }
    }
    return maxDev;
}