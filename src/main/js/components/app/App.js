import React, {Component} from 'react'
import StickyCartHeader from "../stickyheader/StickyCartHeader";
import './App.scss';
import Content from './../content/Content'
import Modal from "../modal/Modal";
import CartInfo from "../cart/CartInfo";

export default class App extends Component {

    render() {
        this.state;
        return <>
            <div className='app'>
                <StickyCartHeader stickyContent={<CartInfo/>} mainContent={<Content/>}/>
            </div>
            <Modal/>
        </>;
    }
}
