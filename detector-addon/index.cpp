#include "index.h"

using namespace Napi;
// Constructor for Detector
Detector::Detector(const Napi::CallbackInfo &info) : ObjectWrap(info)
{
    Napi::Env env = info.Env();
}
/**
 * The function learns normal data by a path to csv file and a given model type
 * info[0] - csv path
 * info[1] - model type
 * returns - A string represents the model learned
 **/ 
Napi::Value Detector::LearnNormal(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();

    TimeSeries ts(info[0].As<Napi::String>().Utf8Value().c_str());
    string detectorType = info[1].As<Napi::String>().Utf8Value();
    TimeSeriesAnomalyDetector *detector;
    if (detectorType == "regression")
    {
        detector = new SimpleAnomalyDetector();
    }
    else if (detectorType == "hybrid")
    {
        detector = new HybridAnomalyDetector();
    }
    else
    {
        Napi::TypeError::New(env, "Not a valid detector").ThrowAsJavaScriptException();
        return env.Null();
    }
    detector->learnNormal(ts);
    vector<correlatedFeatures> v = detector->getNormalModel();
    string model;
    model.append(detectorType + ":\n");
    for (correlatedFeatures f : v)
    {
        model.append(f.feature1 + "," + f.feature2 + "," + to_string(f.corrlation) + "," + to_string(f.threshold) + ",");
        if (!f.isCircle)
        {
            model.append("regression," + to_string(f.lin_reg.a) + "," + to_string(f.lin_reg.b) + "\n");
        }
        else
        {
            model.append("circle," + to_string(f.circle.center.x) + "," + to_string(f.circle.center.y) + "," + to_string(f.circle.radius) + "\n");
        }
    }
    return Napi::String::New(env, model);
}
/**
 * The function gets a vector of anomalyReports and compresses them
 * reports - The vector of anomaly reports to compress
 * returns - A string of compressed reports
 **/ 
string CompressReports(vector<AnomalyReport> reports)
{
    // check if reports is empty
    if (!reports.empty())
    {
        string compressed;
        int startTimeStep;
        int timeStep;
        string description;
        bool isStart = true;
        // for each report
        for (AnomalyReport r : reports)
        {
            if (isStart)
            {
                startTimeStep = r.timeStep;
                timeStep = r.timeStep;
                description = r.description;
                isStart = false;
            }
            // if this is a new description, add the old compressed report and start a new one
            else if (description != r.description)
            {
                compressed.append(description + ",[" + to_string(startTimeStep) + "," + to_string(timeStep) + "]" + "\n");
                description = r.description;
                timeStep = r.timeStep;
                startTimeStep = r.timeStep;
            }
            // if the time step is different by 1, add 1 to the compressed report
            else if (timeStep == r.timeStep-1)
            {
                timeStep++;
            }
            // else, add the compressed report, and start a new one
            else
            {
                compressed.append(description + ",[" + to_string(startTimeStep) + "," + to_string(timeStep) + "]" + "\n");
                timeStep = r.timeStep;
                startTimeStep = r.timeStep;
            }
        }
        // return the string
        return compressed;
    }
    return "";
}
/**
 * The function detects anomalies in a csv file by a path to the file and a model as string
 * info[0] - The model as string
 * info[1] - The path to the data in a csv file
 * returns - A string represents the anomalies found
 **/ 
Napi::Value Detector::Detect(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();
    stringstream input(info[0].As<Napi::String>().Utf8Value());
    string detectorType = "";
    // get the model type
    getline(input, detectorType, ':');
    vector<correlatedFeatures> newCF;

    string line;
    string f1, f2;
    float corr, thresh, a, b, r;
    // remove the line after the model type found
    getline(input, line);
    // for each line
    while (getline(input, line))
    {
        string value;
        int i = 0;
        bool isCircle = false;
        stringstream lineStream(line);
        // for each value seperated in ','
        while (getline(lineStream, value, ','))
        {
            // check if the value is circle
            if (value == "circle")
            {
                isCircle = true;
                continue;
            }
            // check if the value is regression
            else if (value == "regression")
            {
                continue;
            }
            // if there are 6 values, the last one is radius
            if (isCircle && i == 6)
            {
                r = stof(value);
            }
            else
            {
                // check i value and for each, insert the data in a different argument
                switch (i)
                {
                case 0:
                    f1 = value;
                    break;
                case 1:
                    f2 = value;
                    break;
                case 2:
                    corr = stof(value);
                    break;
                case 3:
                    thresh = stof(value);
                    break;
                case 4:
                    a = stof(value);
                    break;
                case 5:
                    b = stof(value);
                    break;
                default:
                    break;
                }
            }
            i++;
        }
        // if the value is not circle, create a regression correlation
        if (!isCircle)
        {
            newCF.push_back(correlatedFeatures(f1, f2, corr, thresh, a, b, r));
        }
        // else, create a circle correlation
        else
        {
            newCF.push_back(correlatedFeatures(f1, f2, corr, thresh, a, b));
        }
        isCircle = false;
    }
    // set the detector by the given type
    TimeSeriesAnomalyDetector *tsd;
    if (detectorType == "regression")
    {
        tsd = new SimpleAnomalyDetector();
        tsd->setCorrelatedFeatures(newCF);
    }
    else if (detectorType == "hybrid")
    {
        tsd = new HybridAnomalyDetector();
        tsd->setCorrelatedFeatures(newCF);
    }
    // detect the anomalies
    TimeSeries ts(info[1].As<Napi::String>().Utf8Value().c_str());
    vector<AnomalyReport> reports = tsd->detect(ts);
    // compress the reports found
    string reportsData = CompressReports(reports);
    // return the result
    return Napi::String::New(env, reportsData);
}
// export LearnNormal and Detect functions
Napi::Function Detector::GetFunctions(Napi::Env env)
{
    return DefineClass(env, "Detector", {Detector::InstanceMethod("LearnNormal", &Detector::LearnNormal), Detector::InstanceMethod("Detect", &Detector::Detect)});
}

Napi::Object Init(Napi::Env env, Napi::Object exports)
{
    Napi::String name = Napi::String::New(env, "Detector");
    exports.Set(name, Detector::GetFunctions(env));
    return exports;
}

NODE_API_MODULE(cppaddon, Init)