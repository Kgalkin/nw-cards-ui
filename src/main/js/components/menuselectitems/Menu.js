import React, {useEffect, useState} from "react";
import {getMenu} from "../../utils/apiUtils";
import MenuItem from "./MenuItem";
import "./Menu.scss"
import TagSelect from "./TagSelect";

export default function Menu(props) {
    const [state, setState] = useState({
        menuItems: [],
        tagSelectVisible: false
    })

    const {menuItems, tagSelectVisible} = state;

    useEffect(() => {
        getMenu().then(r => setState({menuItems: r, tagSelectVisible}))
    }, [])

    const class_name = "menu"
    return <>
        <div className={class_name}>{state.menuItems.map(
            it => <MenuItem key={it.name} item={it}/>)}

            <div className={`${class_name}_search`}
                 onClick={() => setState(
                     {menuItems, tagSelectVisible: !state.tagSelectVisible})}>
                Расширенный поиск
            </div>
        </div>
        {state.tagSelectVisible ? <TagSelect/> : null}
    </>;
}