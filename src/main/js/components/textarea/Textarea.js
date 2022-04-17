import React from "react";

export class Textarea extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.element = null;
    }

    componentDidMount() {
        this.setState({value: this.props.value})
    }


    render() {
        const {autosize, value, disabled, onChange} = this.props
        return (
            <textarea ref={c => this.element = c}
                      style={autosize ? {height: this.element.scrollHeight} : {}}
                      value={value}
                      disabled={disabled}
                      onChange={onChange}>
            </textarea>
        );
    }
}