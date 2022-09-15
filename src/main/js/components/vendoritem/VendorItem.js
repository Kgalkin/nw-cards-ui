import React from 'react'
import './VendorItem.scss';
import {addToCart, showModal} from './../../reducers/actions'
import {connect} from "react-redux";
import Image from "../image/Image";
import {cartSvg} from "../cart/CartUtils";
import {IMAGE_PREVIEW} from "../../reducers/modal";

class VendorItem extends React.Component {
    constructor(props) {
        super(props);

        this.className = "item";
    }
    render() {
        const {id, price, inStock} = this.props.item;
        const {title, description, links} = this.props.item.data;
        return <div id={id} className={this.className} style={{opacity: inStock ? "1" : "50%"}}>
            <h3>{title}</h3>
            <div className={`${this.className}_imageContainer`}
                 onClick={()=> this.props.showModal({modalType: IMAGE_PREVIEW, data: {links: links}})}>
                <Image links={links}/>
            </div>
            <div className={`${this.className}_descriptionBlock`}>
                <div>
                    <p className={`${this.className}_description`}>{description}</p>
                    <p className={`${this.className}_inStock`}>{`В наличии: ${inStock}`}</p>
                </div>
                <button className={`${this.className}_addButton`}
                        onClick={() => {
                            this.props.addToCart({...this.props.item, count:1})
                        }}
                disabled={!inStock}>
                    <span>{inStock ? `Добавить в корзину - ${price}руб`  : 'Нет в наличии'}</span>
                    {inStock && <div>{cartSvg()}</div>}
                </button>

            </div>
        </div>
    }
}

export default connect(null, {addToCart, showModal})(VendorItem)