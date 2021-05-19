import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";
// core components
import AlgorithmsList from "components/AlgorithmsList.js";
import UploadButton from "components/UploadButton.js";
import DetectButton from "components/DetectButton.js";
import AnomalyTable from "components/AnomalyTable.js";
import image1 from "assets/img/background.jpg";

import styles from "assets/jss/material-kit-react/views/components.js";

const useStyles = makeStyles(styles);

export default function Components(props) {
  const classes = useStyles();
  const [algorithm, setAlgorithm] = React.useState("select");
  const [modelFile, setModelFile] = React.useState("");
  const [anomalyFile, setAnomalyFile] = React.useState("");
  const [anomalyData, setAnomalyData] = React.useState(null);
  const [renderAnomalyData, setRenderAnomalyData] = React.useState(false);

  return (
    <div>
      <Parallax image={image1}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <h1 className={classes.title}>Anomaly Detection Server</h1>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <GridContainer className={classes.textCenter}>
            <GridItem xs={12} className={classes.matan}>
              <AlgorithmsList
                setAlgorithm={setAlgorithm}
                algorithm={algorithm}
              />
            </GridItem>
            <GridItem xs={12} item={true} md={3} className={classes.yuval}>
              <UploadButton
                buttonText={"Upload Model File"}
                fieldText={"Model Path"}
                setFile={setModelFile}
              />
            </GridItem>
            <GridItem xs={12} item={true} md={3} className={classes.noam}>
              <UploadButton
                buttonText={"Upload Anomaly File"}
                fieldText={"Anomaly Path"}
                setFile={setAnomalyFile}
              />
            </GridItem>
            <GridItem xs={12}>
              <DetectButton
                algorithm={algorithm}
                modelFile={modelFile}
                anomalyFile={anomalyFile}
                setAnomalyData={setAnomalyData}
                setRenderedData={setRenderAnomalyData}
              />
            </GridItem>
            <GridItem xs={12}>
              <AnomalyTable
                anomalyData={anomalyData}
                renderedData={renderAnomalyData}
                setRenderedData={setRenderAnomalyData}
              />
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
