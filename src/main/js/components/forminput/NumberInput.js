import React, {Component} from 'react'

class NumberInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value
        };
        this.handleValChange = this.handleValChange.bind(this);
    }

    handleValChange(e) {
        const value = Number(e.target.value);
        if (value || value === 0)
            this.setState({value: e.target.value});
    }

    render() {
        return <input value={this.state.value} onBlur={this.props.onBlur}
                      onChange={this.handleValChange}/>
    }
}

export default NumberInput