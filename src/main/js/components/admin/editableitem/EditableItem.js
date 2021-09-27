import React from 'react';
import Content from "../../content/Content";
import VendorItem from "../../vendoritem/VendorItem";

export class EditableItem extends VendorItem{
    constructor(props) {
        super(props);
        this.state = {
            inStock: 0
        }
    }

    render(){

    }
}