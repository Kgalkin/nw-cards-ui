import React, {Component} from 'react';
import "./Content.scss"

export default class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            style: {
                paddingTop: "auto"
            }
        }
    }

    updateStyle(style) {
        this.setState({style});
    }

    render() {
        const {
            children
        } = this.props;
        const className = "content";
        return <div className={className} style={this.state.style}>
            <div className={`${className}_vendorItemContainer`}>
                {children}
            </div>
        </div>
    }
}