import React, {useState} from "react";
import "./TextWithMore.scss"

const className = "textWithMore"

export default function TextWithMore(props){
  const [open, setOpen] = useState(null)
  const {text, cutAfter} = props;
  const noOpen = text.length <= (cutAfter || 0);

  return <div className={className}>
          {open ? text : text.substring(0, cutAfter)}
          {noOpen ? null : <span className={`${className}_control`}
              onClick={() => setOpen(!open)}>
            {open ? ' ^^^' : ' ...'}</span>}
        </div>
}