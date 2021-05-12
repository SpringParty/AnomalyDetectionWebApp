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

  handleChange = e => {
    this.setState({File: e.target.files[0], FileName: e.target.files[0].name}, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state.File);
      }
    })
  };

  render() {
    const openFileExplorer = event => {
      this.fileInput.current.click();
    };
    
    return (
        <form>
      <GridContainer>
        <GridContainer>          
          <GridItem xs={6}>
            <TextField
              label={this.props.inputText}              
              formControlProps={{ fullWidth: true }}    
              inputProps={{readOnly: true}}
              ref={this.costumInputText}
              value={this.state.FileName}
            />
          </GridItem>
          <GridItem xs={6}>
          <input type="file" id="fileUpload" ref={this.fileInput} accept=".csv" onChange={this.handleChange} style={{display:'none'}}/>
            <Button
              type="button"
              color="info"  
              onClick={openFileExplorer}>
              {this.props.buttonText}
            </Button>
          </GridItem>
        </GridContainer>
      </GridContainer>
      </form>
    );
  }
}
export default UploadButton;
