import React, {Component} from 'react'
import {HOST_AND_PORT} from "../../utils/utils";

export default class Image extends Component {

    render() {
        const {links} = this.props;
        return <img src={HOST_AND_PORT + links.short.substr(1)} alt={links.original}/>
    }
}