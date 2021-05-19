# 🕵️‍♀️ AnomalyDetectionWebApp
## 🔎 Overview

### Special Features
#### For Developers
##### Adding Detectors
In order add a detector type manually, you can modify or add c++ code to cppaddon folder.

A simple way of doing that, is to create a class that inherits TimeSeriesAnomalyDetecor class in AnomalyDetector.h file, and implements learnNormal and Detect methods.
Then, you need to add in index.cpp file, 'if' sentence in LearnNormal and Detect mehods to check if a string of the new detecor is given, and construct it.

If your detector adds some new features, you can also modify correlatedFeatures struct in AnomalyDetector.h file, and add the feautes to Detect method in index.cpp. 

## 👪 Project Hierarchy

To view the detailed hierarchy, expand the sections below:
<details>
<summary>AnomalyDetectionWebApp</summary>
<p>
<details>
<summary>build</summary>
<p>

```

```

</p>
</details>
<details>
<summary>detector-addon</summary>
<p>

```
├── AnomalyDetector.h
├── HybridAnomalyDetector.cpp
├── HybridAnomalyDetector.h
├── SimpleAnomalyDetector.cpp
├── SimpleAnomalyDetector.h
├── anomaly_detection_util.cpp
├── anomaly_detection_util.h
├── binding.gyp
├── build
│   ├── Release
│   │   ├── cppaddon.node
│   │   └── obj
│   │      └── cppaddon
│   │            ├── HybridAnomalyDetector.obj
│   │            ├── SimpleAnomalyDetector.obj
│   │            ├── anomaly_detection_util.obj
│   │            ├── cppaddon.node.recipe
│   │            ├── index.obj
│   │            ├── minCircle.obj
│   │            ├── timeseries.obj
│   │            └── win_delay_load_hook.obj
├── index.cpp
├── index.h
├── index.js
├── minCircle.cpp
├── minCircle.h
├── package.json
├── timeseries.cpp
└── timeseries.h
```
</p>
</details>
<details>
<summary>public</summary>
<p>

```

```

</p>
</details>
<details>
<summary>src</summary>
<p>

```

```

</p>
</details>
</p>
</details>



## 🔧 Technical Requirements
1. Install LTS version of [Node.js](https://nodejs.org/en/).
   While installing Node.js, make sure that the following path will be added to PATH environment variable: C:\\Users\username\AppData\Roaming\npm.
2. Install nodemon from npm - open cmd and run the following command: `npm install nodemon -g`
3. Install [postman](https://www.postman.com/downloads/) in order to test http requests.

## 📋 Installation Guide for Clean Environment
1. Install [React Developer Tools for Google Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en).
2. After clonening repo, open cmd from the repo's folder and run the following command: `npm i`
3. Open cmd from the repo's folder and run the following command: `npm start`

## 📚 Further Documentation
For more info regarding the main classes of the project, information flow and UML diagrams, please refer to our Wiki Site.

## 🎥 Demo

