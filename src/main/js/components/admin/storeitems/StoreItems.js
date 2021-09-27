import React from 'react';
import {Content} from "../../content/Content";
import VendorItem from "../../vendoritem/VendorItem";
import {connect} from "react-redux";
import {showModal} from "../../../reducers/actions";
import {CREATE_ITEM_MODAL} from "../../../reducers/modal";

class StoreItems extends Content {
    constructor(props) {
        super(props);
    }

    render() {
        const {showModal} = this.props;
        return <>
            <button onClick={() => showModal({modalType: CREATE_ITEM_MODAL})}>{"Добавить новый товар"}</button>
            {super.render()}</>
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

export default connect(null, {showModal})(StoreItems);