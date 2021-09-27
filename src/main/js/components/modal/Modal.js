import React, {Component} from 'react';
import {connect} from "react-redux";
import './Modal.scss'
import {hideModal} from "../../reducers/actions";
import {CART_MODAL, CREATE_ITEM_MODAL, ORDER_FORM_MODAL} from "../../reducers/modal";
import CartContent from "../cart/CartContent";
import OrderForm from "../orderform/OrderForm";
import CreateItem from "../createitem/CreateItem";

class Modal extends Component {
    render() {
        const {
            modalType,
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
                {this.modalContent(modalType)}
            </div>
        </div>
    }

    modalContent = (modalType) => {
        switch (modalType) {
            case CART_MODAL:
                return <CartContent/>;
            case ORDER_FORM_MODAL:
                return <OrderForm/>;
            case CREATE_ITEM_MODAL:
                return <CreateItem/>;
            default:
                return null;

        }
    }
}

export default connect(state => {
    console.log(state);
    return ({
    showModal: state.modal.showModal,
    modalType: state.modal.modalType
})}, {hideModal})(Modal)