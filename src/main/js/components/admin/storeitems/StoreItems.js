import React from 'react';
import Content from "../../content/Content";
import {connect} from "react-redux";
import {showModal} from "../../../reducers/actions";
import {CREATE_ITEM_MODAL} from "../../../reducers/modal";
import {EditableItem} from "../editableitem/EditableItem";
import './StoreItems.scss'
import SearchLine from "./SearchLine";

function StoreItems(props) {
  const constructItems = (items) => {
    let children = [];
    items.forEach(i => children.push(<EditableItem key={i.id} item={i}/>));
    return children;
  }

  return <>
    <button className={`content_admin_create_new`}
            onClick={() => props.showModal(
                {modalType: CREATE_ITEM_MODAL})}>{"Добавить новый товар"}</button>
    <SearchLine/>
    <Content constructItems={constructItems}/></>

}

export default connect(null,
    {showModal})(StoreItems);