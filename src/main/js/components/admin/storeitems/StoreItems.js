import React, {Component} from 'react';
import {loadItems} from "../../content/contentUtils";
import VendorItem from "../../vendoritem/VendorItem";

class StoreItems extends Component{
    constructor(props) {
        super(props);
        this.className = "storeItems";
    }

    render() {
        return <div className={this.className} style={this.state.style}>
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