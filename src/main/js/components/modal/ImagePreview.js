import React from "react";
import {HOST_AND_PORT} from "../../utils/apiUtils";
import "./ImagePreview.scss"

export default class ImagePreview extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return <img className='imagePreview'
                src={HOST_AND_PORT + this.props.links[0]?.substring(1)}
                alt={HOST_AND_PORT + this.props.links[1]?.substring(1)}/>
  }
}