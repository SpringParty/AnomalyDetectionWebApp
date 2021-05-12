import React, { Component,useRef } from "react";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import { TextField } from "@material-ui/core";

class UploadButton extends Component {
  state = {    
    File: "",
    FileName:"",
  };
  constructor(props){
    super(props);
    this.fileInput = React.createRef();
    this.costumInputText = React.createRef();
    }    
  render() {
    const openFileExplorer = event => {
      this.fileInput.current.click();
    };
    const chooseFile = event => {
      this.setState({File: event.target.files[0]});
      this.setState({FileName: document.getElementById("fileUpload").files[0].path})
    };
    return (
        <form>
      <GridContainer>
        <GridContainer>
          <GridItem>
          <input type="file" id="fileUpload" ref={this.fileInput} accept=".csv" onChange={chooseFile} style={{display:'none'}}/>
            <Button
              type="button"
              color="info"  
              onClick={openFileExplorer}>
              {this.props.buttonText}
            </Button>
          </GridItem>
          <GridItem xs={6}>
            <TextField
              label={this.props.inputText}              
              formControlProps={{ fullWidth: true }}    
              inputProps={{readOnly: true}}
              ref={this.costumInputText}
              value={this.state.FileName}
            />
          </GridItem>
        </GridContainer>
      </GridContainer>
      </form>
    );
  }
}
export default UploadButton;
