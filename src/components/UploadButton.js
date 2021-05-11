import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
// material-ui components
import InputAdornment from "@material-ui/core/InputAdornment";

import styles from "../assets/jss/material-kit-react/components/buttonStyle.js";

const useStyles = makeStyles(styles);

class UploadButton extends Component {

  render() {
    return (
      <GridContainer>
        <GridContainer>
          <GridItem>
            <Button type="button" color="info">
              {this.props.text}
            </Button>
          </GridItem>
          <GridItem xs={6}>
            <CustomInput
              labelText={this.props.inputText}
              id="disabled"
              formControlProps={{ fullWidth: true }}
              inputProps={{ disabled: true }}
            />
          </GridItem>
        </GridContainer>
      </GridContainer>
    );
  }
}
export default UploadButton;
