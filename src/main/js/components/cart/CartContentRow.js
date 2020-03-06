import React, {Component} from 'react'
import './CartContentRow.scss'
import SmallImage from "../image/SmallImage";

export default class CartContentRow extends Component {
    render() {
        const {
            id,
            title,
            count,
            price,
        } = this.props.item;
        const total = this.props.item.total || count * price;
        const className = 'cartContentRow';
        return <div className={className}>
            <div className={`${className}_image`}>
                {id ? <SmallImage id={id}/> : null}
            </div>
            <div className={`${className}_title`}>{title}</div>
            <div className={`${className}_count`}>{count}</div>
            <div className={`${className}_price`}>{price}</div>
            <div className={`${className}_total`}>{total}</div>
        </div>
    }
}