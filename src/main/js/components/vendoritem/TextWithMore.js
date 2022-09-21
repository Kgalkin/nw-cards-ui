import React from "react";

export default class TextWithMore extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }

  render() {
    const {text, cutAfter} = this.props;
    const noOpen = text.length <= cutAfter;
    return (
        <div>
          {this.state.open ? text : text.substring(0, cutAfter)}
          {noOpen ? null : <span
              onClick={e => this.setState({open: !this.state.open})}>
            {this.state.open ? '^' : '...'}</span>}
        </div>
    );
  }
}