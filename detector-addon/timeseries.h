/***
 * timeSeries.h
 *
 * Author: Matan Noach, 316441534
 *
 ***/

#ifndef ADVANCEDPROGRAMMING1_TIMESERIES_H
#define ADVANCEDPROGRAMMING1_TIMESERIES_H

#include "map"
#include "vector"
#include "fstream"
#include "iostream"
#include "sstream"

using namespace std;

/**
 * The class represents a time series of data.
 * The data is mapped by key: string of the feature's name, value: a vector of floats
 */
class TimeSeries {
private:
    string csvFileName;
    map<string, vector<float>> csvData;
public:
    /**
     * Constructor. initialize the csvFileName, and run readData function to initialize csvData map.
     * @param csvFileName - The csv file to read from
     */
    explicit TimeSeries(const char *csvFileName);

    /**
     * copy constructor.
     * @param ts
     */
    TimeSeries(const TimeSeries &ts);
    /**
     * Default constructor
     */
    TimeSeries();

    /**
     * The function opens the csv file by the file name initialized in the constructor.
     * if the file did not open, throw a runtime error.
     * @return The input file stream of the object
     */
    ifstream openCSV();

    /**
     * The function reads a row from a csv file, by taking each string between ',' and add it to a vector.
     * @param row - The row to read from
     * @return A vector<string> object of the row's data
     */
    vector<string> readRow(string row);


    /**
     * The function reads the csv data from the file initialized by the constructor.
     * The map is organized: key = column name, value = a float vector
     */
    void readData();

    /**
    * The function gets a column name and returns it's data as a vector
    * @param colName The column name
    * @return A vector of the column data
    */
    vector<float> getColumn(const string &colName) const;

    /**
     * The function reads the rows from the csv file
     * The function gets a number of columns, reads each row and returns a vector of rows (each rows is also a vector)
     * @param columnsNums - The number of columns in the file
     * @return A vector<vector<float>> that represents the rows and their values
     */
    vector<vector<float>> readRows(int columnsNum);

    /**
     * The function returns the csvData
     * @return The csvData
     */
    map<string, vector<float>> getCSVData() const;

    /**
     * The function returns a vector of featureNames
     */
    vector<string> getFeatureNames() const;

    /**
     * The function inserts a new feature and it's vector of values to the map
     * @param featureName - The feature's name
     * @param values - The feature's values
     */
    void insertFeature(const string &featureName, const vector<float> &values);

    /**
     * The function inserts a new row of values to the map
     * @param values - a map of features and values to insert
     */
    void insertRows(const map<string, float> &values);

    /**
     * The function returns a value from a certain feature by a timestamp
     * @param featureName - The feature name to get the value from
     * @param timeStamp - The timestamp from when to get the value
     * @return The value at the timestamp
     */
    float getValueFromFeature(const string &featureName, const int &timeStamp) const;

    /**
     * The function checks if the timeseries data object is empty
     * @return True if it's empty and false otherwise
     */
    bool isEmpty() const;

    /**
     * The function prints the csv file.
     * If the file does not exist, print that it is empty
     */
    void Print() const;

    int getRowsNum() const;

    /**
     * Destructor: deletes the map object 'csvData' before deleting the object
     */
    ~TimeSeries();

};

#endif //ADVANCEDPROGRAMMING1_TIMESERIES_H
