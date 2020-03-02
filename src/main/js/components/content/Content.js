import React, {Component} from 'react';
import "./Content.scss"

export default class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            children: [],
            style: {
                paddingTop: "auto"
            }
        }
    }

    render() {
        const className = "content";
        return <div className={className} style={this.state.style}>
            <div className={`${className}_vendorItemContainer`}>
                {this.state.children}
            </div>
        </div>
    }
}