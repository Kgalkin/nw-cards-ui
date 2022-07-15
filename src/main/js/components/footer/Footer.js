import React, {Component} from "react";
import {connect} from "react-redux";
import {showModal} from "../../reducers/actions";
import {CONTACTS_MODAL, USER_AGREEMENT_MODAL} from "../../reducers/modal";
import './Footer.scss'

class Footer extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const className = 'footer';
    return <div className={className}>
      <div onClick={() => this.props.showModal(
          {modalType: CONTACTS_MODAL})}>Контакты</div>
      <span>|</span>
      <div onClick={() => this.props.showModal(
          {modalType: USER_AGREEMENT_MODAL})}>Пользовательское соглашение
      </div>
    </div>
  }
}

export default connect(null, {showModal})(Footer);