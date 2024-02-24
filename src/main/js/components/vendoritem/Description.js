import React, {useRef, useState} from "react";
import "./Description.scss"
import PopUp from "../popup/PopUp";

const className = 'description'
export default function Description(props) {
  const ref = useRef();
  const [open, setOpen] = useState(null);
  const {text} = props;

  return <div ref = {ref} className={className} onClick={() => setOpen(!open)}>
    Описание
    {open && <PopUp content={text} visible={true} signal={() => setOpen(false)} openerRef={ref}/>}
  </div>
}