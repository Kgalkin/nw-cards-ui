import React from "react";
import "./MenuItem.scss"
import {useNavigate} from "react-router-dom";

export default function MenuItem(props) {
  const className = "menu_item"
  const navigate = useNavigate();

  return <div className={className} style={props.item.data?.styles} onClick={() =>
      navigate(`/content?tags=${props.item.data.tags.join(',')}&tagsMethod=${props.item.data.tagsMethod||'and'}`)}>{props.item.name}</div>

}