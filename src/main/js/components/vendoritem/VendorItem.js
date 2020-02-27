import React from 'react'
import './VendorItem.scss';

class VendorItem extends React.Component {
    render() {
        const {
            title,
            price,
            description,
            tags,
            id,
            onClickButton,
        } = this.props;
        const className = "vendorItem";
        return <div id={id} className={className}>
            <h3>{title}</h3>
            <img src={`./img/small/${id}.png`} alt={null}/>
            <div className={`${className}_descriptionBlock`}>
                <p className={`${className}_description`}>{description}</p>
                <button className={`${className}_addButton`} onClick={onClickButton}>
                    {`Добавить в корзину - ${price}`}
                </button>
            </div>
        </div>
    }
}

export default VendorItem