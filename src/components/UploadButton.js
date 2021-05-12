import React, { Component, useRef } from "react";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import { TextField } from "@material-ui/core";

export default function UploadButton({buttonText, fieldText, setFile}) {
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
          <GridItem xs={6}>
            <TextField
              label={fieldText}
              formControlProps={{ fullWidth: true }}
              inputProps={{ readOnly: true }}
              ref={costumInputText}
              value={FileName}
            />
          </GridItem>
          <GridItem xs={6}>
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
