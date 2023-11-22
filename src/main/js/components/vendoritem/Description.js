import React, {useState} from "react";
import "./Description.scss"

export default function Description(props) {
  const [open, setOpen] = useState(null)
  const {text} = props;

  const className = () => {
    let name = 'description';
    if (open){
      name += '_open';
    }
    return name;
  }

  return <div className={className()} onClick={() => setOpen(!open)}>
    {open ? text : "Описание"}
  </div>
}