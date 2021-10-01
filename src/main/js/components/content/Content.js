import React, {Component} from 'react';
import "./Content.scss"
import VendorItem from "../vendoritem/VendorItem";
import {loadItemsPage, PAGE_SIZE} from "../../utils/apiUtils";

export class Content extends Component {
    constructor(props) {
        super(props);
        this.className = "content";
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
    }

    render() {
        return <div className={this.className}>
            <div className={`${this.className}_itemContainer`}>
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
        this.loadItems();
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