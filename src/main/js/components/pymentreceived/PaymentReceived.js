import React from "react";
import "./PaymentReceived.scss"

export class PaymentReceived extends React.Component {
  constructor() {
    super();
  }

  render() {
    return<> <div className={"paymentReceived"}>
      Мы получили ваш платеж, просмотреть заказ можно по ссылке у вас на
      почте.
      <br/>Когда ваш заказ будет собран и отправлен, вы получите письмо с
      трекером, или фото-подтверждение, в случае оплаты доставки простым письмом.
      <br/> Спасибо за заказ!
      <div className={"backLink"}><a href = "/">В магазин</a></div>
    </div>
    </>
  }
}