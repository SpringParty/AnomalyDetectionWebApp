# 🕵️‍♀️ AnomalyDetectionWebApp
## 🔎 Overview
AnomalyDetectionWebApp allows the user to detect anomalies of a desired CSV file based on learned data, using an algorithm of choice. 
### Special Features
#### For Users
1) The web client is designed in a **modern, user-friendly fashion**.
2) The web client **validates that all data was provided** by the user, and alerts the user in case required fields are missing.
3) The web client **indicates when the detection process is finished** using a cool notification.
4) **Anomalies can be sorted** by feature name, reason, and time.
5) In case the user tries to access a non-existant page, a **designed error-404 page** pops up, indicating the problem.
#### For Developers
##### Adding Detectors
In order add a detector type manually, you can modify or add c++ code to cppaddon folder.

A simple way of doing that, is to create a class that inherits TimeSeriesAnomalyDetecor class in AnomalyDetector.h file, and implements learnNormal and Detect methods.
Then, you need to add in index.cpp file, 'if' sentence in LearnNormal and Detect mehods to check if a string of the new detecor is given, and construct it.

If your detector adds some new features, you can also modify correlatedFeatures struct in AnomalyDetector.h file, and add the feautes to Detect method in index.cpp. 

##### Sending detect POST request
In order to send a post request from anywhere (POSTMAN, SOAPUI etc..), send a detect post request to port 8080 as the following:
1. Type the following http request: http://localhost:8080/api/detect?
2. Use query parameter model_type, and choose: regression (for Linear Regression detector), hybrid (for Hybrid detector).
3. Upload 2 files:
   - model: a csv file with data to learn from.
   - anomaly: a csv file with the data with anomalies.
4. Send the request.

for example:
![image](https://user-images.githubusercontent.com/64840957/120096238-edf95c80-c132-11eb-9430-c846d9ec7412.png)


## 👪 Project Hierarchy

To view the detailed hierarchy, expand the sections below:
<details>
<summary>AnomalyDetectionWebApp</summary>
   <p>

```
Detector.js
```

</p>
<p>

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
│   └── Release
│       └── cppaddon.node
├── index.cpp
├── index.h
├── index.js
├── minCircle.cpp
├── minCircle.h
├── node_modules
├── package.json
├── timeseries.cpp
└── timeseries.h
```
</p>
</details>
   <p>

```
server.js
```

</p>
<details>
<summary>src</summary>
<p>

```
├── assets
|    ├── css
|    |   └── material-kit-react.css.map
|    ├── img
|    │   ├── 404.gif
|    │   └── background.jpg
|    ├── jss
|    │   ├── material-kit-react
|    │   │   ├── components
|    │   │   │   ├── buttonStyle.js
|    │   │   │   ├── customDropdownStyle.js
|    │   │   │   ├── headerLinksStyle.js
|    │   │   │   ├── headerStyle.js
|    │   │   │   └── parallaxStyle.js
|    │   │   ├── tooltipsStyle.js
|    │   │   └── views
|    │   │       ├── components.js
|    │   │       └── componentsSections
|    │   │           └── navbarsStyle.js
|    │   └── material-kit-react.js
|    └── scss
├── components
│   ├── AlgorithmsList.js
│   ├── AnomalyTable.js
│   ├── CustomButtons
│   │   └── Button.js
│   ├── CustomDropdown
│   │   ├── CustomDropdown.js
│   │   └── CustomDropdown.jsx
│   ├── DetectButton.js
│   ├── Grid
│   │   ├── GridContainer.js
│   │   └── GridItem.js
│   ├── Header
│   │   ├── Header.js
│   │   └── HeaderLinks.js
│   ├── Notification.js
│   ├── Parallax
│   │   └── Parallax.js
│   └── UploadButton.js
├── index.css
├── index.js
└── views
      └── Components
          └── Components.js
```

</p>
</details>

</p>
</details>

The project was constructed using MVC architecture:

* **M**odel: **detector-addon** contains the algorithmic logic of the product, specifically **cppaddon.node** & **Detector.js**. Future developers can extend the algorithmic logic, as explained [here](https://github.com/SpringParty/AnomalyDetectionWebApp/wiki/Detector-Model).

* **V**iew: The product's view is stored in **src** folder and was implemented using material-ui-kit.

* **C**ontroller: **server.js** acts as the controller component, sending HTTP requests to operate the model, and using the vuew layer of the product.

Further documentation regarding the project's UML can be found [here](https://github.com/SpringParty/AnomalyDetectionWebApp/wiki).

## 🔧 Technical Requirements
1. Install LTS version of [Node.js](https://nodejs.org/en/).
   While installing Node.js, make sure that the following path will be added to PATH environment variable: C:\\Users\username\AppData\Roaming\npm.
2. Install nodemon from npm - open cmd and run the following command: `npm install nodemon -g`
3. Install [postman](https://www.postman.com/downloads/) in order to test http requests.

## 📋 Installation Guide for Clean Environment
1. Install [React Developer Tools for Google Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en).
2. After cloning repo, open cmd from the repo's folder and run the following command: `npm i`
3. Open cmd from the repo's folder and run the following commands: `npm run build` , `npm start`

## 📚 Further Documentation
For more info regarding the main classes of the project, information flow and UML diagrams, please refer to our [Wiki Site](https://github.com/SpringParty/AnomalyDetectionWebApp/wiki).

## 🎥 Demo
[Our demo video](https://youtu.be/D23w01bhofc)
