/***
 * anomaly_detection_util.h
 *
 * Author: Matan Noach, 316441534
 *
 ***/
#ifndef ADVANCEDPROGRAMMING1_ANOMALY_DETECTION_UTIL_H
#define ADVANCEDPROGRAMMING1_ANOMALY_DETECTION_UTIL_H

/**
 * The function returns the variance of x
 * @param x - The array of values
 * @param size - The array's size
 * @return The variance of x
 */
float var(float *x, int size);

/**
 * The function returns the covariance of x and y
 * @param x - The x array values
 * @param y - The y array values
 * @param size - The arrays' sizes
 * @return The variance of x
 */
float cov(float *x, float *y, int size);

/**
 * The function returns the pearson correlation coefficient of x and y
 * @param x - The x array values
 * @param y - The y array values
 * @param size - The arrays' sizes
 * @return The pearson of x and y
 */
float pearson(float *x, float *y, int size);


/**
 * The class represents a point in a cartesian system
 */
class Point {
public:
    float x, y;

    /**
     * A constructor that set values for x and y
     * @param x - The value of x
     * @param y - The value of y
     */
    Point(float x, float y) : x(x), y(y) {}
};

/**
 * The class represents a linear function in a cartesian system
 */
class Line {
public:
    float a, b;

    /**
     * Default constructor
     */
    Line() {
        this->a = 0.0;
        this->b = 0.0;
    }

    /**
     * A constructor that sets values for a and b
     * @param a - The value of a
     * @param b - The value of b
     */
    Line(float a, float b) : a(a), b(b) {}

    /**
     * The function returns the value of x in the function
     * @param x - The value to set for x in the function
     * @return The function result
     */
    float f(float x) {
        return a * x + b;
    }
};
/**
 * The function creates a linear function by a set of points using line regression
 * @param points - The points array
 * @param size - The array's size
 * @return A line object
 */
Line linear_reg(Point **points, int size);

/**
 * The function calculates the deviation between point p and the line as equation of the points
 * @param p - The points to find the deviation from
 * @param points - The points array
 * @param size - The array's size
 * @return The deviation of p
 */
float dev(Point p, Point **points, int size);

/**
 * The function calculates the deviation between point p and the line
 * @param p - The points to find the deviation from
 * @param l - The line
 * @return The deviation of p
 */
float dev(Point p, Line l);

/**
 * The function measures the distance between two points
 * @param p1 - The first point
 * @param p2 - The second point
 * @return The distance between the two points
 */
float distance(Point p1, Point p2);
/**
 * The function finds max deviation between a line and a set of points
 * @param reg - The regression line
 * @param array - The array of points
 * @param size - The array's size
 * @return The max deviation
 */
float findMaxDev(Point** array, int size,Line reg);
#endif //ADVANCEDPROGRAMMING1_ANOMALY_DETECTION_UTIL_H
