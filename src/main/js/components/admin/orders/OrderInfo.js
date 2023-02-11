import React from "react";
import Image from "../../image/Image";
import "./OrderInfo.scss"
import {patchOrder} from "../../../utils/apiUtils";
import {isFinalState} from "./OrderUtils";
import {isNumber} from "../../../utils/utils";
import {ButtonFileUpload} from "./ButtonFileUpload";

const className = "order_info"

export class OrderInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {order} = this.props
    return <div className={className}>
      <div className={`${className}_actions`}>
        {this.createAddCommentsAction()}
        {this.createSetDeliveryPriceAction()}
        {this.createRevokeOrderAction()}
        {this.createReadyForShippingAction()}
        {this.createSendToCustomerActionPostCode()}
        {this.createSendToCustomerActionImage()}
      </div>
      <div className={`${className}_description`}>
        {this.createDescriptionItem('Имя:', order.data.name)}
        {this.createDescriptionItem('Почта:', order.data.email)}
        {this.createDescriptionItem('Адрес:', order.data.address)}
        {this.createDescriptionItem('Индекс:', order.data.index)}
        {this.createDescriptionItem('Комментарии:', order.data.comments)}
        {this.createDescriptionItem('Доставка:', order.data.deliveryOption.price)}
        {order.data.adminComments ?
            this.createDescriptionItem("Комментарий администратора:",
                order.data.adminComments)
            : null}
      </div>
      <table className={`${className}_table`}>
        <thead>
        <tr>
          <th>View</th>
          <th>Id</th>
          <th>Название</th>
          <th>Количество</th>
          <th>Стоимость</th>
          <th>Итого</th>
        </tr>
        </thead>
        <tbody>
        {order.data.items.map(
            item => this.createRow(`${className}_row_${order.id}`, item))}
        </tbody>
      </table>
    </div>
  }

  createDescriptionItem = (label, value) => {
   return <div className={`${className}_description_item`}>
      <div className={`${className}_description_item_label`}>{label}</div>
      <div
          className={`${className}_description_item_value`}>{value}</div>
    </div>
  }

  createRow = (prefix, item) => {
    return <tr key ={`${prefix}_${item?.id}`} className={`${prefix}_item_${item?.id}`}>
      <td><Image links={item.data.links}/></td>
      <td>{item.id}</td>
      <td>{item.data.title}</td>
      <td>{item.count}</td>
      <td>{item.price}</td>
      <td>{item.price * item.count}</td>
    </tr>
  }

  createSetDeliveryPriceAction = () => {
    return this.props.order.data.deliveryOption.price >= 0 || isFinalState(
        this.props.order.state) ? null :
        <button className={`${className}_actions_setdeliveryprice`}
                onClick={() => {
                  const deliveryPrice = prompt("Укажите цену доставки")
                  if (isNumber(deliveryPrice)) {
                    this.sendPatchOrder(
                        {advance: "SET_DELIVERY_PRICE", deliveryPrice})
                    .then(r => window.location.reload())
                  } else {
                    alert("Вы ввели нечитаемое чисо")
                  }
                }
                }>Задать цену доставки
        </button>
  }

  createRevokeOrderAction = () => {
    return isFinalState(this.props.order.state) ? null :
        <button
            className={`${className}_actions_revokeorder`}
            onClick={() => {
              if (window.confirm("Вы хотите отменить заказ ?")) {
                this.sendPatchOrder({advance: "REVOKE"})
                .then(r => window.location.reload())
              }
            }}>Отменить
        </button>
  }

  createReadyForShippingAction = () => {
    return this.props.order.state !== "payment_received" ? null :
        <button
            className={`${className}_actions_readyforshipping`}
            onClick={() => {
              if (window.confirm("Заказ готов к отправке ?")) {
                this.sendPatchOrder({advance: "READY_FOR_SHIPPING"})
                .then(r => window.location.reload())
              }
            }}>Готов к отправке
        </button>

  }

  createSendToCustomerActionPostCode = () => {
    const order = this.props.order;
    return order.state !== "ready_for_shipping" ||
    order.data.deliveryOption.id === 1 ? null :
        <button
            className={`${className}_actions_send`}
            onClick={() => {
              let code = window.prompt("Введите трек нмер")
              if (code) {
                this.sendPatchOrder({
                  advance: "SENT_CODE",
                  postalCode: code
                })
                .then(r => window.location.reload())
              }
            }}>Заказ отправлен
        </button>
  }

  createAddCommentsAction = () => {
    return <button
        className={`${className}_actions_addComment`}
        onClick={() => {
          let comment = window.prompt("Введите комментарий")
          if (comment) {
            this.sendPatchOrder({
              advance: "ADD_ADMIN_COMMENTS",
              adminComments: comment
            })
            .then(r => window.location.reload())
          }
        }}>Добавить комментарий</button>
  }

  createSendToCustomerActionImage = () => {
    const order = this.props.order;
    return order.state !== "ready_for_shipping" ||
    order.data.deliveryOption.id !== 1 ? null :
        <ButtonFileUpload label="Заказ отправлен" onFileSelect={(event) => {
          const file = event.target.files[0];
          if (file) {
            this.sendPatchOrder({
              advance: 'SENT_IMAGE'
            }, file)
            .then(r => window.location.reload())
          }
        }}/>
  }

  sendPatchOrder = (data, file) => {
    const formData = new FormData();
    if (data) {
      formData.append("data", JSON.stringify(data))
    }
    if (file) {
      formData.append("image", file)
    }
    return patchOrder(this.props.order.id, formData)
  }

}