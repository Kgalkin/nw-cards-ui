import React, {Component} from 'react';
import {connect} from "react-redux";
import './Modal.scss'
import {hideModal} from "../../reducers/actions";
import CartContent from "../cart/CartContent";

class Modal extends Component {
    render() {
        const {
            content,
            showModal,
            hideModal
        } = this.props;
        const className = 'modal';
        return <div className={className} style={{display: showModal ? "block" : "none"}} onClick={e => {
            if (e.target.className === className) {
                hideModal();
            }
        }}>
            <div className={`${className}_window`}>
                <CartContent/>
            </div>
        </div>
    }
}

export default connect(state => ({showModal: state.modal.showModal}), {hideModal})(Modal)