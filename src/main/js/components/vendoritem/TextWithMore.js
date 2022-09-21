import React from "react";
import "./TextWithMore.scss"

const className = "textWithMore"
export default class TextWithMore extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }

  render() {
    const {text, cutAfter} = this.props;
    const noOpen = text.length <= (cutAfter || 0);
    return (
        <div className={className}>
          {this.state.open ? text : text.substring(0, cutAfter)}
          {noOpen ? null : <span className={`${className}_control`}
              onClick={e => this.setState({open: !this.state.open})}>
            {this.state.open ? ' ^^^' : ' ...'}</span>}
        </div>
    );
  }
}