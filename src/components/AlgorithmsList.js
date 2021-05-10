import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Header from "components/Header/Header.js";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";

import styles from "assets/jss/material-kit-react/views/componentsSections/navbarsStyle.js";

const useStyles = makeStyles(styles);

/**
 * @returns DropDown list of algorithms.
 */
export default function AlgorithmsList() {
  const classes = useStyles();
  // set the default value of chosen to "select"
  const [chosen, setChosen] = React.useState("select");

  /**
   * Modify chosen based on a received event.
   * @param {*} event - the item from the DropDown that was selected
   */
  const onClickHandler = (event) => {
    setChosen(event);
  };

  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
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
                      onClick={onClickHandler}
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
