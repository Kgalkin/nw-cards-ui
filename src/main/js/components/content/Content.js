import React, {Component} from 'react';
import "./Content.scss"
import VendorItem from "../vendoritem/VendorItem";
import {debounce, loadItemsPage, PAGE_SIZE} from "./contentUtils";
import {connect} from "react-redux";
import {loadItems} from "../../reducers/actions";

class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            items: []
        };

        this.loadItems = () => {
            console.log("Setting state");
            this.setState({loading: true});
            loadItemsPage(this.state.items.length || 0 / PAGE_SIZE)
                .then(items => this.setState({items: this.state.items.concat(items), loading: false}))
        };
        this.loadItemsDebounce = debounce(this.loadItems, 1000);
    }

    render() {
        const className = "content";
        return <div className={className}>
            <div className={`${className}_itemContainer`}>
                {this.constructItems()}
                {this.state.loading && <h1>Loading...</h1>}
            </div>
        </div>
    }

    componentDidMount() {
        window.addEventListener('scroll', () => {
            if (document.scrollingElement.scrollHeight / (document.scrollingElement.scrollTop + document.scrollingElement.scrollWidth) < 1.2
            && !this.state.loading) {
                this.loadItems();
            }
        });
        this.loadItemsDebounce();
    }

    constructItems = () => {
        let children = [];
        this.state.items.forEach(i => {
                const {
                    title,
                    description
                } = i.data;
                children.push(<VendorItem key={i.id} id={i.id} title={title} description={description}
                                          price={`${i.price}`} inStock={i.inStock}/>)
            }
        );
        return children;

    }
}

export default Content