import React from "react";
import {addActiveTags, clearItems} from "../../../reducers/actions";
import {connect} from "react-redux";

class MenuItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {item, addActiveTags, clearItems} = this.props;
        return <div onClick={() => {
            addActiveTags({activeTags: item.tags})
            clearItems()
        }}>{item.name}</div>
    }
}

export default connect(null, {addActiveTags, clearItems})(MenuItem);