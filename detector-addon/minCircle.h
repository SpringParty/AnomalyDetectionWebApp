/***
 * minCircle.h
 *
 * Author: Matan Noach, 316441534
 *
 ***/
#ifndef ADVANCEDPROGRAMMING1_MINCIRCLE_H
#define ADVANCEDPROGRAMMING1_MINCIRCLE_H

#include <iostream>
#include "cmath"
#include "anomaly_detection_util.h"
using namespace std;

// ------------ DO NOT CHANGE -----------

class Circle {
public:
    Point center;
    float radius;

    Circle(Point c, float r) : center(c), radius(r) {}
};

// --------------------------------------
/**
 * Thee function finds the minimum circle that holds all points in p
 * @param points - The points array
 * @param size - The array's size
 * @return A minimum circle that holds all points in p
 */
Circle findMinCircle(Point **points, size_t size);
// you may add helper functions here
#endif //ADVANCEDPROGRAMMING1_MINCIRCLE_H
