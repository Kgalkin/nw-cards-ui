import ReactDOM from 'react-dom';
import React from 'react';
import GoodsItem from './components/goodsItem'
import './styles/styles.scss';

let indents = [];
for (let i = 0; i < 5; i++) {
    let title = "Title " + i;
    let description = "description number " + i;
    indents.push(<GoodsItem id={i} title={title} description={description} price="15$"/>,)
}
ReactDOM.render(
    indents,
    document.querySelector("#root"));