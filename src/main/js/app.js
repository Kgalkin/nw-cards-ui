import ReactDOM from 'react-dom';
import React from 'react';
import VendorItem from './components/vendoritem/VendorItem'
import StickyCartHeader from "./components/stickyheader/StickyCartHeader";
import Content from "./components/content/Content"
import './styles/styles.scss';
import Cart from "./components/cart/Cart";

let header = React.createRef();
let content = React.createRef();
let cart = React.createRef();

/*for (let i = 0; i < 20; i++) {
    let title = "Заголовок " + i;
    let description = "Описание товара №" + i;
    indents.push(<VendorItem key={i} id={i} title={title} description={description} price={`${i}руб`}
                             onClickButton={() => {
                                 cart.current.updateCart(1, i);
                             }}/>,)
}*/

window.onscroll = () => {
    let scrolledPosition = header.current.scrolledElement.getBoundingClientRect().bottom;
    let isSticky = scrolledPosition < 0;
    header.current.setState({isSticky});
    let style = {
        paddingTop: isSticky ? `${header.current.stickyElement.getBoundingClientRect().height}px` : "0px"
    };
    content.current.setState({style});
};

ReactDOM.render(
    <div className='app'>
        <StickyCartHeader ref={header} stickyContent={<Cart ref={cart}/>}/>
        <Content ref={content}/>
    </div>,
    document.querySelector("#root"));

(function loadItems() {

    fetch("http://localhost:8001/api/getItems" )
        .then(response => response.json())
        .then(json => {
            let children = [];
            json.forEach(i => {
                    const {
                        title,
                        description,
                        price
                    } = i.data;
                    children.push(<VendorItem key={i.id} id={i.id} title={title} description={description} price={`${price}руб`}
                                              onClickButton={() => {
                                                  cart.current.updateCart(1, price);
                                              }}/>)
                }
            );
            content.current.setState({children});
        });
})();