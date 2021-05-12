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

import styles from "assets/jss/material-kit-react/views/componentsSections/navbarsStyle.js";

const useStyles = makeStyles(styles);

/**
 * @returns DropDown list of algorithms.
 */
export default function AlgorithmsList() {
  const [snackPack, setSnackPack] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [messageInfo, setMessageInfo] = React.useState(undefined);

  React.useEffect(() => {
    if (snackPack.length && !messageInfo) {
      // Set a new snack when we don't have an active one
      setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && messageInfo && open) {
      // Close an active snack when a new one is added
      setOpen(false);
    }
  }, [snackPack, messageInfo, open]);

  const classes = useStyles();
  // set the default value of chosen to "select"
  const [chosen, setChosen] = React.useState("select");

  /**
   * Modify chosen based on a received event.
   * @param {*} event - the item from the DropDown that was selected
   */
  const dropdownOnClickHandler = (event) => {
    setChosen(event);
  };

  const buttonOnClickHandler = (message) => () => {
    if (chosen == "select") {
      setSnackPack((prev) => [...prev, { message, key: new Date().getTime() }]);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleExited = () => {
    setMessageInfo(undefined);
  };

  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <div className={classes.title}>
              <h4>Choose an Anomaly Detection Algorithm:</h4>
            </div>
            <Header
              brand="Algorithm:"
              color="info"
              leftLinks={
                <List className={classes.list}>
                  <ListItem className={classes.listItem}>
                    <CustomDropdown
                      buttonText={chosen}
                      hoverColor="info"
                      dropdownHeader="Algorithms List"
                      buttonProps={{
                        className: classes.navLink,
                        color: "transparent",
                      }}
                      dropdownList={["Linear Regression", "Hybrid"]}
                      onClick={dropdownOnClickHandler}
                    />
                  </ListItem>
                </List>
              }
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={12} justify="left">
            <Button
              color="info"
              onClick={buttonOnClickHandler(
                <span>
                  <b>NO ALGORITHM WAS SELECTED:</b> Please select an algorithm
                  before clicking DETECT
                </span>
              )}
            >
              Detect
            </Button>
          </GridItem>
        </GridContainer>
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
    </div>
  );
}
