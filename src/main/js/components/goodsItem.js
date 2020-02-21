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
        const imageName = id + '.png';
        const imageSmallPath = './img/small/' + imageName;
        return <div id={id}>
            <h3>{title}</h3>
            <img width = "200" height="250" src={imageSmallPath} alt={null}/>
            <p>{description}</p>
        </div>
    }
}

export default GoodsItem