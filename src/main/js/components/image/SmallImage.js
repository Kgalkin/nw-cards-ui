import React, {Component} from 'react'
import {getSmallImageLink} from "../../utils/utils";

export default class SmallImage extends Component {

    render() {
        const {id} = this.props;
        return <img src={getSmallImageLink(id)} alt={id}/>
    }
}