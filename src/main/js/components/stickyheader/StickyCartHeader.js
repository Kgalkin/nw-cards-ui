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
        const className = "stickyCartHeader";
        return <div className={className}>
            <img className={`${className}_scrolledLogo`} ref={elem => this.scrolledElement = elem} src="/img/logo.jpg"
                 alt/>
            <div className={`${className}_static` + (this.state.isSticky ? " sticky" : "")}
                 ref={elem => this.stickyElement = elem}>
                <div className={`${className}_chart`}><span>{`Сумма:${this.state.totalPrice}`}</span><span>Корзина:<span
                    className={`${className}_chart_items_count`}>0</span></span></div>
            </div>
        </div>;
    }
}

export default StickyCartHeader;