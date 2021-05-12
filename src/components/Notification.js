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

import fileUpload from "express-fileupload";
import styles from "assets/jss/material-kit-react/components/snackbarContentStyle.js";

const useStyles = makeStyles(styles);

export default function Notification({ data, errorData, message, click,setClick }) {
  const classes = useStyles();
  const [snackPack, setSnackPack] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [messageInfo, setMessageInfo] = React.useState(undefined);

  React.useEffect(() => {    
    if (click) {
      if (data == errorData) {
        setSnackPack((prev) => [
          ...prev,
          { message, key: new Date().getTime() },
        ]);
      }
    }
    if (snackPack.length && !messageInfo) {
      // Set a new snack when we don't have an active one
      setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setOpen(true);
      setClick(false);
    } else if (snackPack.length && messageInfo && open) {
      // Close an active snack when a new one is added
      setOpen(false);
    }
  }, [snackPack, messageInfo, open, click]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleExited = () => {
    setMessageInfo(undefined);
  };

  const buttonOnClickHandler = () => {};

  return (
    <div className={classes.danger}>
      <Snackbar
        key={messageInfo ? messageInfo.key : undefined}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={open}
        onClose={handleClose}
        onExited={handleExited}
        color="danger"
        message={messageInfo ? messageInfo.message : undefined}
        action={
          <React.Fragment>
            <Button icon round color="rose" size="sm" onClick={handleClose}>
              OK
            </Button>
          </React.Fragment>
        }
      />
    </div>
  );
}
