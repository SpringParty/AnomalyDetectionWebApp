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
export default function AlgorithmsList({algorithm,setAlgorithm}) {

  const classes = useStyles();

  /**
   * Modify chosen based on a received event.
   * @param {*} event - the item from the DropDown that was selected
   */
  const dropdownOnClickHandler = (event) => {
    setAlgorithm(event);
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
                      buttonText={algorithm}
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
          
        </GridContainer>        
      </div>
    </div>
  );
}
