import React from 'react'
import './VendorItem.scss';
import {addToCart} from './../../reducers/actions'
import {connect} from "react-redux";
import SmallImage from "../image/SmallImage";

class VendorItem extends React.Component {
    constructor(props) {
        super(props);

        this.className = "item";
    }
    render() {
        const {
            title,
            price,
            description,
            inStock,
            id,
            addToCart
        } = this.props;
        return <div id={id} className={this.className}>
            <h3>{title}</h3>
            <div className={`${this.className}_imageContainer`}>
                <SmallImage id={id}/>
            </div>
            <div className={`${this.className}_descriptionBlock`}>
                <div>
                    <p className={`${this.className}_description`}>{description}</p>
                    <p className={`${this.className}_inStock`}>{`В наличии: ${inStock}`}</p>
                </div>
                <button className={`${this.className}_addButton`}
                        onClick={() => addToCart({id, title, price, count: 1, inStock})}>
                    {`Добавить в корзину - ${price}руб`}
                </button>

            </div>
        </div>
    }
}

export default connect(null, {addToCart})(VendorItem)