import React, {useRef} from "react";

export class ButtonFileUpload extends React.Component {

  constructor(props) {
    super(props);
    console.log("in constructor")
    this.inputRef = React.createRef();
    console.log("constructed!!")
  }

  render() {
    const {label, onFileSelect} = this.props;
    console.log("in render")
    return <button onClick={() => this.inputRef.current.click()}>
      <input ref={this.inputRef} type="file" id="file" style={{display: "none"}}
             onChange={onFileSelect}/>
      {label}
    </button>

  }
}