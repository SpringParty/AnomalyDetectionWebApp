import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Notification from "./Notification.js";
import { SnackbarProvider } from "notistack";

import styles from "assets/jss/material-kit-react/components/buttonStyle.js";

const useStyles = makeStyles(styles);

export default function DetectButton({ algorithm, modelFile, anomalyFile }) {
  const classes = useStyles();

  const [click, setClick] = React.useState(false);

  const buttonOnClickHandler = () => {
    setClick(true);
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
