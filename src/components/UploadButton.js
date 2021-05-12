import React from "react";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";

import styles from "assets/jss/material-kit-react/components/customInputStyle.js";

const useStyles = makeStyles(styles);

export default function UploadButton({ buttonText, fieldText, setFile }) {
  const classes = useStyles();

  const fileInput = React.createRef();
  const costumInputText = React.createRef();
  const [FileName, setFileName] = React.useState(null);
  const handleChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const openFileExplorer = (event) => {
    fileInput.current.click();
  };

  return (
    <form>
      <GridContainer>
        <GridContainer>
          <GridItem>
            <TextField
              // label={fieldText}
              formControlProps={{ fullWidth: true }}
              inputProps={{ readOnly: true }}
              ref={costumInputText}
              value={FileName}
            />
          </GridItem>
          <GridItem>
            <input
              type="file"
              id="fileUpload"
              ref={fileInput}
              accept=".csv"
              onChange={handleChange}
              style={{ display: "none" }}
            />
            <Button type="button" color="info" onClick={openFileExplorer}>
              {buttonText}
            </Button>
          </GridItem>
        </GridContainer>
      </GridContainer>
    </form>
  );
}
