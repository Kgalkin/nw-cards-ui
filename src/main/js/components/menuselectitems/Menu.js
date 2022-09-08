import React from "react";
import {getMenu} from "../../utils/apiUtils";
import {connect} from 'react-redux'
import MenuItem from "./MenuItem";
import "./Menu.scss"

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuItems: []
        }
    }


    componentDidMount() {
        getMenu().then(r => this.setState({menuItems: r}))
    }

    render() {
        const {
            menuItems,
        } = this.state
        const class_name = "menu"
        return <div className={class_name}>{menuItems.map(it => <MenuItem item={it}/>)}</div>;
    }
}

export default connect(state =>
    ({m: state.tags.values.filter(tag => tag.isMenuItem)}), null)(Menu)