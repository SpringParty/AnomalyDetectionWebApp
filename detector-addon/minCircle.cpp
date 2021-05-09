/***
 * minCircle.cpp
 *
 * Author: Matan Noach, 316441534
 *
 ***/
#include "minCircle.h"

/**
 * The function finds the trivial circle in case of 1,2 or 3 points
 * @param points - The points array
 * @param size - The array's size
 * @return The trivial circle
 */
Circle trivialCircle(Point **points, size_t size) {
    // if there is one point, return The points with radius 0
    if (size == 1) {
        return Circle(*points[0], 0);
    }
    // if there are 2 points, set them on a diameter, find the center and return the circle
    if (size == 2) {
        float x = (points[0]->x + points[1]->x) / 2;
        float y = (points[0]->y + points[1]->y) / 2;
        Point center(x, y);
        return Circle(center, distance(*points[0], center) / 2);
    }
    // Else, the size is 3. This time,  use equations to find the Circle:
    // define p1 - points[0], p2 - points[1], p3 - points[2]
    // each of xamb is the results of pa->x minux pb->x (same goes for yamb)
    float x1m2 = points[0]->x - points[1]->x;
    float x1m3 = points[0]->x - points[2]->x;

    float y1m2 = points[0]->y - points[1]->y;
    float y1m3 = points[0]->y - points[2]->y;

    float x3m1 = points[2]->x - points[0]->x;
    float x2m1 = points[1]->x - points[0]->x;

    float y3m1 = points[2]->y - points[0]->y;
    float y2m1 = points[1]->y - points[0]->y;

    // Each of sxamb is the result (pa->x)^2 - (pb->x)^2 (same goes for syamb)
    float sx1m3 = pow(points[0]->x, 2) - pow(points[2]->x, 2);
    float sy1m3 = pow(points[0]->y, 2) - pow(points[2]->y, 2);

    float sx2m1 = pow(points[1]->x, 2) - pow(points[0]->x, 2);
    float sy2m1 = pow(points[1]->y, 2) - pow(points[0]->y, 2);

    // 2 calculations by the equations:
    // f is -y, and g is -x of the center
    float f = ((sx1m3 * x1m2) + (sy1m3 * x1m2) + (sx2m1 * x1m3) + (sy2m1 * x1m3)) / (2 * ((y3m1 * x1m2) - (y2m1 * x1m3)));
    float g = ((sx1m3 * y1m2) + (sy1m3 * y1m2) + (sx2m1 * y1m3) + (sy2m1 * y1m3)) / (2 * ((x3m1 * y1m2) - (x2m1 * y1m3)));
    // using f and g to find the c in the equation
    float c = -pow(points[0]->x, 2) - pow(points[0]->y, 2) - 2 * g * points[0]->x - 2 * f * points[0]->y;

    float xCenter = -g;
    float yCenter = -f;
    // find the radius by the euqation
    float radius = sqrt(xCenter * xCenter + yCenter * yCenter - c);

    // return the circle
    return Circle(Point(xCenter, yCenter), radius);
}
/**
 * The function checks if point p is inside circle c
 * @param c - The circle
 * @param p - The point
 * @return true if the points is inside the circle and false otherwise
 */
bool isPointInsideC(Circle c, Point p) {
    // The function checks the distance from p to the center of the circle.
    // if the distance is shorter than the radius, return true
    float d = distance(c.center, p);
    if (d <= c.radius) {
        return true;
    }
    // if not, return false
    return false;
}

/**
 * The algorithm works in recursion to find the minimum circle of points in p, with a helper set of r.
 * @param points - The set of points to find the minimum circle for
 * @param rSet - A helper set
 * @param sizePoints - The size of Points the algorithm notices
 * @param sizeR - The size of R the algorithm notices
 * @return The minimum circle for p
 */
Circle welzlAlgorithm(Point **points, Point **rSet, size_t sizePoints, int sizeR) {
    // base case - if point's size is 1 or if rSet size is 3, return the trivial circle of R
    if (sizePoints == 1 || sizeR == 3) {
        return trivialCircle(rSet, sizeR);
    }
    // choose a random number in p size
    int rnd = rand() % sizePoints;
    Point p = *points[rnd];
    // swap the points in the random position with the last point in the array
    swap(*points[rnd], *points[sizePoints - 1]);
    // enter to a recursion without the random point found
    Circle c = welzlAlgorithm(points, rSet, sizePoints - 1, sizeR);
    // if the point is inside the circle, return the circle - it is the minimum for this set of points
    if (isPointInsideC(c, p)) {
        return c;
    }
    // else, add point p to rSet and run the recursion again
    *rSet[sizeR] = p;
    return welzlAlgorithm(points, rSet, sizePoints - 1, sizeR + 1);
}
// documentation in minCircle.h
Circle findMinCircle(Point **points, size_t size) {
    // create a set of points the same size as 'points' and initialize each one
    Point **rSet = new Point *[size];
    for (int i = 0; i < size; i++) {
        rSet[i] = new Point(0, 0);
    }
    // Find the minimum circle with welzl's algorithm
    Circle c = welzlAlgorithm(points, rSet, size, 0);
    // delete rSet
    delete[] rSet;
    // return the circle
    return c;
}

