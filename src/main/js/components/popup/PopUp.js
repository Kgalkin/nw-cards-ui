import React, {useEffect, useRef, useState} from 'react'
import './PopUp.scss'

const className = "popup"
export default function PopUp(props) {
  const ref = useRef();

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

  return <div ref={ref} className={className}>{props.content}</div>
}