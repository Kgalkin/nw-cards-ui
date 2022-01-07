import React from "react";
import {getMenu} from "../../../utils/apiUtils";
import {connect} from 'react-redux'
import MenuItem from "./MenuItem";

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuItems:[]
        }
    }


    componentDidMount() {
        getMenu().then(r => this.setState({menuItems: r}))
    }

    render() {
        const {
            menuItems,
        } = this.state
        return <>{menuItems.map(it => <MenuItem item={it}/>)}</>;
    }
}

export default connect(state =>
    ({m: state.tags.values.filter(tag => tag.isMenuItem)}), null)(Menu)