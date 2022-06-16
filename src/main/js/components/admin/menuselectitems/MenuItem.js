import React from "react";
import {addActiveTags, clearItems} from "../../../reducers/actions";
import {connect} from "react-redux";
import "./MenuItem.scss"

class MenuItem extends React.Component {
    constructor(props) {
        super(props);
        this.className = "menu_item"
    }

    render() {
        const {item, addActiveTags, clearItems} = this.props;
        return <div className={this.className} onClick={() => {
            addActiveTags({activeTags: item.tags})
            clearItems()
        }}>{item.name}</div>
    }
}

export default connect(null, {addActiveTags, clearItems})(MenuItem);