import React, {Component} from 'react';
import "./Content.scss"
import VendorItem from "../vendoritem/VendorItem";
import {loadItemsPage} from "./contentUtils";
import {connect} from "react-redux";
import {LOADING} from "../../reducers/actions";

class Content extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            storeItems
        } = this.props;
        const className = "content";
        return <div className={className}>
            <div className={`${className}_itemContainer`}>
                {this.constructItems(storeItems)}
            </div>
        </div>
    }

    componentDidMount() {
        loadItemsPage(0);
    }

    constructItems = storeItems => {
            let children = [];
            storeItems.items.forEach(i => {
                    const {
                        title,
                        description
                    } = i.data;
                    children.push(<VendorItem key={i.id} id={i.id} title={title} description={description}
                                              price={`${i.price}`} inStock={i.inStock}/>)
                }
            );
            if (storeItems.state === LOADING){
                children.push(<h1>Loading...</h1>)
            }
            return children;

    }
}

export default connect(state => ({storeItems: state.storeItems}), null)(Content)