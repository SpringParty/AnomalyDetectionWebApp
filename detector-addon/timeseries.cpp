/***
 * timeSeries.cpp
 *
 * Author: Matan Noach, 316441534
 *
 ***/

#include "timeseries.h"
#include "map"
#include "vector"
#include "iostream"

// documentation in timeseries.h
TimeSeries::TimeSeries(const char *csvFileName) {
    this->csvFileName = csvFileName;
    readData();
}

// documentation in timeseries.h
TimeSeries::TimeSeries(const TimeSeries &ts) {
    this->csvFileName = ts.csvFileName;
    this->csvData = ts.csvData;
}
TimeSeries::TimeSeries() = default;

// documentation in timeseries.h
ifstream TimeSeries::openCSV() {
    // try to open the csv file. if there was a problem, throw an exception. else, return the file
    ifstream file(this->csvFileName);
    if (!file.is_open()) { throw runtime_error("The file: " + csvFileName + " could not be opened"); }
    return file;
}

// documentation in timeseries.h
vector<string> TimeSeries::readRow(string row) {
    vector<string> rowData;
    string data;
    //create a stringStream by the row
    stringstream ss(row);
    //split the row by ',' and push each string to a vector
    while (getline(ss, data, ',')) {
        //Trim the spaces if there are
        auto startLetter = data.find_first_not_of(' ');
        rowData.push_back(data.substr(startLetter));
    }
    return rowData;
}

// documentation in timeseries.h
vector<vector<float>> TimeSeries::readRows(int columnsNum) {
    ifstream file = openCSV();
    string line;
    vector<vector<float>> columns;
    //skip the features names line
    getline(file, line);
    //get the first line and create a vector for each column
    getline(file, line);
    for (int i = 0; i < columnsNum; i++) {
        vector<float> v;
        v.push_back(stof(readRow(line)[i]));
        columns.push_back(v);
    }
    //read each line of the csv file
    while (getline(file, line)) {
        //insert each column value to it's vector
        for (int i = 0; i < columnsNum; i++) {
            columns[i].push_back(stof(readRow(line)[i]));
        }
    }
    file.close();
    //return the columns
    return columns;
}

// documentation in timeseries.h
void TimeSeries::readData() {
    ifstream file = openCSV();
    vector<string> keys;
    string line;
    getline(file, line);
    // read the first row as keys (feature names)
    keys = readRow(line);
    int keysNum = keys.size();
    auto columns = readRows(keysNum);
    vector<string>::iterator iter;
    // iterate through the the keys and for each one, insert it's column
    for (iter = keys.begin(); iter != keys.end(); iter++) {
        this->csvData.insert(make_pair(*iter, columns[iter - keys.begin()]));
    }
    // close the file
    file.close();
}

// documentation in timeseries.h
vector<float> TimeSeries::getColumn(const string &colName) const {
    return this->csvData.at(colName);
}

// documentation in timeseries.h
map<string, vector<float>> TimeSeries::getCSVData() const {
    return this->csvData;
}

// documentation in timeseries.h
vector<string> TimeSeries::getFeatureNames() const {
    vector<string> keys;
    auto keysIterator = this->csvData.begin();
    //iterate through the csvData features, and push each one to the vector
    for (; keysIterator != this->csvData.end(); keysIterator++) {
        keys.push_back(keysIterator->first);
    }
    return keys;
}

// documentation in timeseries.h
void TimeSeries::insertFeature(const string &featureName, const vector<float> &values) {
    this->csvData.insert(pair<string, vector<float>>(featureName, values));
}

// documentation in timeseries.h
float TimeSeries::getValueFromFeature(const string &featureName, const int &timeStamp) const {
    return this->getColumn(featureName)[timeStamp];
}

// documentation in timeseries.h
void TimeSeries::insertRows(const map<string, float> &values) {
    // if the size are different, the row can't be added to the table
    if (values.size() != this->csvData.size()) {
        //TODO: throw an exception
    } else {
        // foe each feature in the csvData, value at feature name to the map at feature name
        for (const auto &feature:this->csvData) {
            cout << values.at(feature.first) << endl;
            this->csvData[feature.first].push_back(values.at(feature.first));
        }
    }
}

// documentation in timeseries.h
bool TimeSeries::isEmpty() const {
    return this->csvData.empty();
}

// documentation in timeseries.h
void TimeSeries::Print() const {
    cout << "The File " << csvFileName << ":" << endl;
    if (this->csvData.empty()) { cout << "Time Series is empty" << endl; }
    else {
        auto keysIterator = this->csvData.begin();
        for (; keysIterator != this->csvData.end(); keysIterator++) {
            cout << keysIterator->first << ": ";
            auto valuesIterator = keysIterator->second.begin();
            for (; valuesIterator != keysIterator->second.end(); valuesIterator++) {
                cout << *valuesIterator << ", ";
            }
            cout << endl;
        }
    }
}
int TimeSeries::getRowsNum()const{
    auto iter = this->csvData.begin();
    return iter->second.size();
}
// documentation in timeseries.h
TimeSeries::~TimeSeries() = default;