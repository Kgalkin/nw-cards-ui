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

    componentDidMount() {
        window.addEventListener('scroll', this.sticky);
    }

    sticky = () => {
        this.setState({isSticky: this.scrolledElement.getBoundingClientRect().bottom < 0});
    };

    componentWillUnmount() {
        window.removeEventListener('scroll', this.sticky)
    }

    render() {
        const {
            stickyContent,
            mainContent
        } = this.props;
        const className = "stickyCartHeader";
        return <>
            <div className={className}>
                <img className={`${className}_scrolledLogo`} ref={elem => this.scrolledElement = elem}
                     src="./static/img/logoSale.jpg"
                     alt={`none`}/>
                <div className={`${className}_static` + (this.state.isSticky ? " sticky" : "")}
                     ref={elem => this.stickyElement = elem}
                     style={this.state.isSticky ? {width: `${this.scrolledElement.width}px`} : {}}>
                    {stickyContent}
                </div>
            </div>
            <div style={this.state.isSticky ? {paddingTop: `${this.stickyElement.clientHeight}px`} : {}}>
                {mainContent}
            </div>
        </>;

    }
}

export default StickyCartHeader;