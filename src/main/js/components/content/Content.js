import React, {Component} from 'react';
import "./Content.scss"
import VendorItem from "../vendoritem/VendorItem";
import {loadItems} from './contentUtils.js';

export default class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            children: <h1>Loading...</h1>,
        }
    }

    render() {
        const className = "content";
        return <div className={className} style={this.state.style}>
            <div className={`${className}_itemContainer`}>
                {this.state.children}
            </div>
        </div>
    }

    componentDidMount() {
        loadItems()
            .then(json => {
                let children = [];
                json.forEach(i => {
                        const {
                            title,
                            description
                        } = i.data;
                        children.push(<VendorItem key={i.id} id={i.id} title={title} description={description}
                                                  price={`${i.price}`} inStock = {i.inStock}/>)
                    }
                );
                this.setState({children});
            });
    }
}