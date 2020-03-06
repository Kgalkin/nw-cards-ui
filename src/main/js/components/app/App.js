import React, {Component} from 'react'
import StickyCartHeader from "../stickyheader/StickyCartHeader";
import './App.scss';
import Cart from "./../cart/Cart";
import Content from './../content/Content'

export default class App extends Component {

    render(){
        this.state;
        return <div className='app'>
            <StickyCartHeader stickyContent={<Cart/>} mainContent={<Content/>}/>
        </div>;
    }
}
