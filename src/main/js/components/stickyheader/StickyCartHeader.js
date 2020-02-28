import React, {Component} from 'react';
import "./StickyCartHeader.scss"

class StickyCartHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalPrice: "0",
            isSticky: false
        };
    }

    updatePrice = (newPrice) => {
        this.setState({totalPrice: newPrice});
    };

    render() {
        const {
            stickyContent
        } = this.props;
        const className = "stickyCartHeader";
        return <div className={className}>
            <img className={`${className}_scrolledLogo`} ref={elem => this.scrolledElement = elem} src="/img/logo.jpg"
                 alt={`none`}/>
            <div className={`${className}_static` + (this.state.isSticky ? " sticky" : "")}
                 ref={elem => this.stickyElement = elem}
                 style={this.state.isSticky ? {width: `${this.scrolledElement.width}px`} : {}}>
                {stickyContent}
            </div>
        </div>;
    }
}

export default StickyCartHeader;