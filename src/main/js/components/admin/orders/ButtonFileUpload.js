import React, {useRef} from "react";

export class ButtonFileUpload extends React.Component {

  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  render() {
    const {label, onFileSelect} = this.props;
    return <button onClick={() => this.inputRef.current.click()}>
      <input ref={this.inputRef} type="file" id="file" style={{display: "none"}}
             onChange={onFileSelect}/>
      {label}
    </button>

  }
}