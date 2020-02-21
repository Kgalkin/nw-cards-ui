import ReactDOM from 'react-dom';
import React from 'react';
import GoodsItem from './components/goodsItem'
import './styles/styles.scss';

ReactDOM.render(
    <GoodsItem id="1" title = "Title 1" description = "some text here" price = "15$"/>,
    document.querySelector("#root"));