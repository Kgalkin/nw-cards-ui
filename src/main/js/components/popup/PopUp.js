import React, {useEffect, useRef, useState} from 'react'
import './PopUp.scss'

const className = "popup"
export default function PopUp(props) {
  const ref = useRef();
  const [visible, setVisible] = useState({...props.visible});

  useEffect(() => {
    setVisible(props.visible);
  }, [props.visible])

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)
          && !props.openerRef.current?.contains(event.target)) {
        props.signal()
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return visible ? <div ref={ref} className={className}>{props.content}</div> : null
}