import React, {useEffect} from 'react';
import { useNavigate } from "react-router-dom";

export default function PrivateRoute(children){
  const navigate = useNavigate();
  if (localStorage.getItem("auth")){
    return children
  }
  useEffect(() => {
    navigate('/login')
  })
  return null;
}
