import React from 'react'
class GoodsItem extends React.Component {
    render() {
        const {
            title,
            price,
            description,
            tags,
            id,
        } = this.props;
        return <div id={id}>
            <h3>{title}</h3>
            <img src='.img/small/{id}.png'/>
            <p>{description}</p>
        </div>
    }
}
export default GoodsItem