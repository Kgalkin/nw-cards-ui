import React from 'react'
import './VendorItem.scss';
import {addToCart} from './../../reducers/actions'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

class VendorItem extends React.Component {
    render() {
        const {
            title,
            price,
            description,
            tags,
            id,
            onClickButton
        } = this.props;
        const className = "vendorItem";
        return <div id={id} className={className}>
            <h3>{title}</h3>
            <img src={`./static/img/small/${id}.png`} alt={null}/>
            <div className={`${className}_descriptionBlock`}>
                <p className={`${className}_description`}>{description}</p>
                <button className={`${className}_addButton`} onClick={() => onClickButton({id, title, price, count: 1})}>
                    {`Добавить в корзину - ${price}руб`}
                </button>
            </div>
        </div>
    }


}

const mapDispatchToProps = dippatch => ({
    onClickButton: bindActionCreators(addToCart, dippatch)
});

export default connect(null, mapDispatchToProps)(VendorItem)