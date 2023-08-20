import React from 'react'
import './VendorItem.scss';
import {addToCart, showModal} from './../../reducers/actions'
import {connect} from "react-redux";
import Image from "../image/Image";
import {cartSvg} from "../cart/CartUtils";
import {IMAGE_PREVIEW} from "../../reducers/modal";
import TextWithMore from "./TextWithMore";

const className = "item";
function VendorItem(props){
        const {id, price, oldPrice, inStock} = props.item;
        const {title, description, links} = props.item.data;
        return <div id={id} className={className} style={{opacity: inStock ? "1" : "50%"}}>
            <h3>{title}</h3>
            <div className={`${className}_imageContainer`}
                 onClick={()=> props.showModal({modalType: IMAGE_PREVIEW, data: {links: links}})}>
                <Image links={links}/>
            </div>
            <div className={`${className}_descriptionBlock`}>
                <div>
                    <TextWithMore text={description} cutAfter={50} className={`${className}_description`}/>
                    <p className={`${className}_inStock`}>{`В наличии: ${inStock}`}</p>
                </div>
                <button className={`${className}_addButton`}
                        onClick={() => {
                            props.addToCart({...props.item, count:1})
                        }}
                disabled={!inStock}>
                    {inStock ? <span>{cartSvg()}</span> : null}
                    {inStock ? buildPrice(oldPrice, price) : null}
                </button>

            </div>
        </div>
}

const buildPrice = (oldPrice, price) => {
    if (oldPrice && price){
        return <>
            <span className={'oldPrice'}>{`${oldPrice}руб`}</span>
            <span>{`${price}руб`}</span>
        </>
    } else {
        return <span>{`${price}руб`}</span>
    }
}

export default connect(null, {addToCart, showModal})(VendorItem)