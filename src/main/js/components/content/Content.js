import React, {Component} from 'react';
import "./Content.scss"
import VendorItem from "../vendoritem/VendorItem";

export default class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            children: <h1>Loading...</h1>,
        }
    }

    loadItems() {
        fetch("http://localhost:8001/api/getItems")
            .then(response => response.json())
            .catch(() => {
                let children = [];
                for (let i = 0; i < 20; i++) {
                    let id = i;
                    let title = "Заголовок " + i;
                    let description = "Описание товара №" + i;
                    let price = 15;
                    children.push({id, data: {title, description, price}});
                }
                return children;
            })
            .then(json => {
                let children = [];
                json.forEach(i => {
                        const {
                            title,
                            description,
                            price
                        } = i.data;
                        children.push(<VendorItem key={i.id} id={i.id} title={title} description={description}
                                                  price={`${price}`}/>)
                    }
                );
                this.setState({children});
            });
    }


    render() {
        const className = "content";
        return <div className={className} style={this.state.style}>
            <div className={`${className}_vendorItemContainer`}>
                {this.state.children}
            </div>
        </div>
    }

    componentDidMount() {
        this.loadItems();
    }
}