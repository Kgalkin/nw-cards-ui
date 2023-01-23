import React from "react";
import "./MenuItem.scss"
import {useNavigate} from "react-router-dom";

export default function MenuItem(props) {
  const className = "menu_item"
  const navigate = useNavigate();

  return <div className={className} onClick={() =>
      navigate(`/content?tags=${props.item.tags.join(',')}&tagsMethod=and`)}>{props.item.name}</div>

}