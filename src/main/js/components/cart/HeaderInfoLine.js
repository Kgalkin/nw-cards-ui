import React, {Component} from 'react'
import './HeaderInfoLine.scss'
import {showModal} from "../../reducers/actions";
import {
  ABOUT_US_MODAL,
  CART_MODAL,
  DELIVERY_INFO_MODAL, OZON_MODAL, VK_MODAL
} from "../../reducers/modal";
import {cartSvg} from "./CartUtils";
import {connect} from "react-redux";

class HeaderInfoLine extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      itemsCount,
      totalPrice,
      showModal
    } = this.props;
    const className = 'headerInfoLine';

    return <div className={className}>
      {/* <svg className={`${className}_iconSvg`} width="30" height="30" viewBox="0 0 30 30" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M14.9728 0C19.1869 0 22.7405 1.44609 25.6336 4.33875C28.5436 7.23188 30 10.7855 30 15C30 19.215 28.5712 22.7231 25.7133 25.5272C22.6781 28.5094 19.0973 30 14.9728 30C10.9013 30 7.38375 28.5178 4.41984 25.5539C1.47375 22.6069 0 19.0898 0 15C0 10.8928 1.47375 7.33922 4.41984 4.33922C7.3125 1.44656 10.83 0 14.9728 0ZM3.375 10.9556C2.92875 12.1875 2.70516 13.5361 2.70516 15.0005C2.70516 18.322 3.91922 21.1973 6.34734 23.6255C8.79375 26.0367 11.6869 27.2419 15.0258 27.2419C18.4013 27.2419 21.3113 26.0194 23.7586 23.572C24.6338 22.733 25.3205 21.8578 25.8202 20.9461L20.1689 18.4284C19.9716 19.3753 19.4944 20.1473 18.7359 20.745C17.9756 21.3431 17.0789 21.6877 16.0434 21.7763V24.0802H14.3025V21.7763C12.6417 21.7594 11.1234 21.1613 9.74906 19.9823L11.8116 17.8931C12.7931 18.8034 13.9097 19.2586 15.1598 19.2586C15.6773 19.2586 16.1198 19.1433 16.4864 18.9103C16.852 18.6787 17.0358 18.2953 17.0358 17.7586C17.0358 17.3831 16.9013 17.0798 16.6336 16.8478L15.1875 16.2314L13.4198 15.4275L11.0358 14.3827L3.375 10.9556ZM15.0267 2.67844C11.6161 2.67844 8.73234 3.88359 6.375 6.29438C5.78531 6.88406 5.23172 7.55344 4.71422 8.30391L10.4466 10.875C10.6964 10.0894 11.1694 9.45984 11.8664 8.98688C12.562 8.51391 13.3748 8.25047 14.3039 8.19656V5.89266H16.0453V8.19656C17.4206 8.26828 18.6703 8.73234 19.7953 9.58922L17.8397 11.5983C16.9992 11.0091 16.1433 10.7147 15.2681 10.7147C14.8036 10.7147 14.3888 10.8042 14.0231 10.9823C13.657 11.1609 13.4738 11.4647 13.4738 11.8931C13.4738 12.0183 13.5183 12.143 13.6073 12.2681L15.5091 13.1259L16.8216 13.7152L19.2328 14.7863L26.9189 18.2147C27.1697 17.1609 27.2944 16.0898 27.2944 15.0005C27.2944 11.5538 26.0981 8.65219 23.7056 6.29438C21.3305 3.88359 18.4364 2.67844 15.0267 2.67844Z"
                    fill="#1C1D1E"/>
            </svg>*/}
      <div className={`${className}_delivery`}
      onClick={() => showModal({modalType: DELIVERY_INFO_MODAL})}>Доставка и оплата</div>
      <div className={`${className}_aboutUs`}
      onClick={() => showModal({modalType: ABOUT_US_MODAL})}>О нас</div>
      <div className={`${className}_vk`}
           onClick={() => showModal({modalType: VK_MODAL})}>Мы вконтакте</div>
      {/*<div className={`${className}_ozon`}
           onClick={() => showModal({modalType: OZON_MODAL})}>Магазин на OZON</div>*/}
      <div
          onClick={() => {
              if (itemsCount) showModal({modalType: CART_MODAL});
          }}
          className={`${className}_cartState`}
          style={itemsCount ? {cursor: 'pointer'} : {}}>
        <span>{`В корзине ${itemsCount} товаров, на сумму ${totalPrice}руб.`}</span>
        {cartSvg()}
      </div>
    </div>
  }

}

const mapStateToProps = state => {
  let itemsCount = 0;
  let totalPrice = 0;
  Object.entries(state.cartItems).forEach(item => {
    itemsCount += item[1].count;
    totalPrice += item[1].count * item[1].price;
  });
  return {itemsCount, totalPrice}
};

export default connect(mapStateToProps, {showModal})(HeaderInfoLine)