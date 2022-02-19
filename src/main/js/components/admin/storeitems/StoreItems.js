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
            <button className={`${this.className}_create_new`}
                    onClick={() => showModal({modalType: CREATE_ITEM_MODAL})}>{"Добавить новый товар"}</button>
            {super.render()}</>
    }

    constructItems = () => {
        let children = [];
        this.props.items.items.forEach(i => {
                children.push(<EditableItem key={i.id} item={i}/>)
            }
        );
        return children;

    }
}

export default connect(s => ({
    activeTags: s.tags.activeTags,
    items: s.items
}), {showModal})(StoreItems);