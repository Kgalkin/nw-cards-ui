import React from 'react';
import {Content} from "../../content/Content";
import {connect} from "react-redux";
import {showModal} from "../../../reducers/actions";
import {CREATE_ITEM_MODAL} from "../../../reducers/modal";
import {EditableItem} from "../editableitem/EditableItem";
import './StoreItems.scss'

class StoreItems extends Content {
    constructor(props) {
        super(props);
    }

    render() {
        const {showModal} = this.props;
        return <>
            <button className={`${this.className}_create_new`} onClick={() => showModal({modalType: CREATE_ITEM_MODAL})}>{"Добавить новый товар"}</button>
            {super.render()}</>
    }

    constructItems = () => {
        let children = [];
        this.state.items.forEach(i => {
                const {
                    title,
                    description
                } = i.data;
                children.push(<EditableItem key={i.id} id={i.id} title={title} description={description}
                                            price={`${i.price}`} inStock={i.inStock}/>)
            }
        );
        return children;

    }
}

export default connect(null, {showModal})(StoreItems);