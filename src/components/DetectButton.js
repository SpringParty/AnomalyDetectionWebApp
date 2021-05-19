import axios from 'axios';
import React from "react";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Notification from "./Notification.js";
import { SnackbarProvider } from "notistack";

export default function DetectButton({ algorithm, modelFile, anomalyFile, setAnomalyData}) {
  const [click, setClick] = React.useState(false);

  const buttonOnClickHandler = () => {
    setClick(true);

    if (algorithm!=="select" && modelFile && anomalyFile) {
      const formData = new FormData();
      formData.append(
        "model",
        modelFile,
        modelFile.name
      );

      formData.append(
        "anomaly",
        anomalyFile,
        anomalyFile.name
      );

      if (algorithm == "Linear Regression") {
        algorithm = "regression";
      } else {
        algorithm = "hybrid";
      }
      axios.post("api/detect?model_type=" + algorithm, formData)
      .then((data) => {
        setAnomalyData(data);
      });
    };

  };

  return (
    <div>
      <GridContainer>
        <GridItem>
          <Button color="info" size="lg" onClick={buttonOnClickHandler}>
            Detect
          </Button>
        </GridItem>
      </GridContainer>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Notification
          data={algorithm}
          errorData={"select"}
          message={
            <span>
              <b>NO ALGORITHM WAS SELECTED</b>
            </span>
          }
          click={click}
          setClick={setClick}
        />
        <Notification
          data={modelFile}
          errorData={null}
          message={
            <span>
              <b>NO MODEL FILE WAS SELECTED</b>
            </span>
          }
          click={click}
          setClick={setClick}
        />
        <Notification
          data={anomalyFile}
          errorData={null}
          message={
            <span>
              <b>NO ANOMALY FILE WAS SELECTED</b>
            </span>
          }
          click={click}
          setClick={setClick}
        />
      </SnackbarProvider>
    </div>
  );
}
