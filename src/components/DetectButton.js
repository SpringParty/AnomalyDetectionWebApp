import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import Snackbar from "@material-ui/core/Snackbar";
import GridItem from "components/Grid/GridItem.js";
import Header from "components/Header/Header.js";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";
import Notification from "./Notification.js";

import styles from "assets/jss/material-kit-react/components/buttonStyle.js";

import fileUpload from "express-fileupload";

const useStyles = makeStyles(styles);

export default function DetectButton({ algorithm, modelFile, anomalyFile }) {
  const classes = useStyles();

  //   const [snackPack, setSnackPack] = React.useState([]);
  //   const [open, setOpen] = React.useState(false);
  //   const [messageInfo, setMessageInfo] = React.useState(undefined);
  const [click, setClick] = React.useState(false);

  //   React.useEffect(() => {
  //     if (snackPack.length && !messageInfo) {
  //       // Set a new snack when we don't have an active one
  //       setMessageInfo({ ...snackPack[0] });
  //       setSnackPack((prev) => prev.slice(1));
  //       setOpen(true);
  //     } else if (snackPack.length && messageInfo && open) {
  //       // Close an active snack when a new one is added
  //       setOpen(false);
  //     }
  //   }, [snackPack, messageInfo, open]);

  //   const handleClose = (event, reason) => {
  //     if (reason === "clickaway") {
  //       return;
  //     }
  //     setOpen(false);
  //   };

  //   const handleExited = () => {
  //     setMessageInfo(undefined);
  //   };

  const buttonOnClickHandler = () => {
    setClick(true);
  };
  return (
    <div className={classes.button}>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12} justify="left">
          <Button color="info" onClick={buttonOnClickHandler}>
            Detect
          </Button>
        </GridItem>
      </GridContainer>
      <Notification
        data={algorithm}
        errorData={"select"}
        message={
          <span>
            <b>NO ALGORITHM WAS SELECTED:</b> Please select an algorithm before
            clicking DETECT
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
            <b>NO MODEL FILE WAS SELECTED:</b> Please select a model file before
            clicking DETECT
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
            <b>NO ANOMALY FILE WAS SELECTED:</b> Please select an anomaly file before
            clicking DETECT
          </span>
        }
        click={click}
        setClick={setClick}
      />
    </div>
  );
}
