import React, {useEffect, useState} from "react";
import {loadOrders} from "../../../utils/apiUtils";
import Order from "./Order";
import "./OrderList.scss"
import {useSearchParams} from "react-router-dom";

export default function OrdersList(props) {
  const [searchParams] = useSearchParams();
  const [orders, setOrders] = useState([])
  const className = 'order_list'

  useEffect(() => {
    loadOrders( searchParams.get('size') || 200,searchParams.get('state'), searchParams.get('name'))
    .then(orders => setOrders(orders));
  }, []);

  const constructOrders = orders => {
    return orders?.map(order => <Order key={order.id} order={order}/>)
  }

  return (
      <table className={className}>
        <thead>
        <tr>
          <th>Номер</th>
          <th>Имя</th>
          <th>Доставка</th>
          <th>Статус</th>
          <th>Дата создания</th>
          <th>Полная стоимость</th>
        </tr>
        </thead>
        <tbody>
        {constructOrders(orders)}
        </tbody>
      </table>)
}
