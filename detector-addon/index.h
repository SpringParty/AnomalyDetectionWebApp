#include <napi.h>
#include "timeseries.h"
#include "SimpleAnomalyDetector.h"
#include "HybridAnomalyDetector.h"

class Detector:public Napi::ObjectWrap<Detector> {
    public:
        Detector(const Napi::CallbackInfo&);
        Napi::Value LearnNormal(const Napi::CallbackInfo&);
        Napi::Value Detect(const Napi::CallbackInfo&);
        static Napi::Function GetFunctions(Napi::Env);
};