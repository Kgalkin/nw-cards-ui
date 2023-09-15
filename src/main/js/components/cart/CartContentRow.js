import React, {Component} from 'react'
import './CartContentRow.scss'
import Image from "../image/Image";
import {connect} from "react-redux";
import {removeFromCart, updateCount} from "../../reducers/actions";

class CartContentRow extends Component {
  constructor(props) {
    super(props)
    this.handleCountChange = this.handleCountChange.bind(this);
    //this.handleCountOnBlur = this.handleCountOnBlur.bind(this);
    this.state = {
      countInputValue: 0,
      inEditing: false,
    }
  }

  handleCountChange(e) {
    this.setState({
      countInputValue: e.target.value,
      inEditing: true,
    });
  }

  render() {
    const {
      id,
      data,
      count,
      price,
      total
    } = this.props.item;
    const {errorMessages} = this.props
    const className = 'cartContentRow';
    return <div className={className}>
      <div className={`${className}_image`}>
        {id ? <Image links={data.links}/> : null}
      </div>
      <div className={`${className}_title`}>{data?.title}</div>
      <div className={`${className + "_count" + (errorMessages && "_error")}`}>
        {Number(count) ?
            <input value={this.state.inEditing ? this.state.countInputValue
                : count} onBlur={(e) => {
              const newCount = Number(e.target.value);
              if (newCount) {
                this.props.updateCount({id, count: newCount});
              }
              this.setState({inEditing: false})
            }}
                   onChange={this.handleCountChange}
                   onKeyDown={e => {
                     if (e.keyCode === 13) {
                       e.target.blur();
                     }
                   }}/> : count}
        {errorMessages?.map(it =>
            <div className={`${className}_warningText`}>{it}</div>)}
      </div>
      <div className={`${className}_price`}>{price}</div>
      <div className={`${className}_total`}>{total}</div>
      <div className={`${className}_remove`}>
        {Number(count) ? <div
            onClick={() => this.props.removeFromCart(id)}>&times;</div> : null}
      </div>
    </div>;
  }
}

export default connect(null, {updateCount, removeFromCart})(CartContentRow)