import React from 'react'
import './VendorItem.scss';
import {addToCart} from './../../reducers/actions'
import {connect} from "react-redux";
import SmallImage from "../image/SmallImage";

class VendorItem extends React.Component {
    render() {
        const {
            title,
            price,
            description,
            inStock,
            id,
            addToCart
        } = this.props;
        const className = "vendorItem";
        return <div id={id} className={className}>
            <h3>{title}</h3>
            <div className={`${className}_imageContainer`}>
                <SmallImage id={id}/>
            </div>
            <div className={`${className}_descriptionBlock`}>
                <div>
                    <p className={`${className}_description`}>{description}</p>
                    <p className={`${className}_inStock`}>{`В наличии: ${inStock}`}</p>
                </div>
                <button className={`${className}_addButton`}
                        onClick={() => addToCart({id, title, price, count: 1, inStock})}>
                    {`Добавить в корзину - ${price}руб`}
                </button>

            </div>
        </div>
    }
}

export default connect(null, {addToCart})(VendorItem)