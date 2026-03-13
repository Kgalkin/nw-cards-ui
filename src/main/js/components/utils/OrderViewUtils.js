import React from "react";

export const constructDataFields = (order, addMap) => {
  const addReq = order?.data?.deliveryOption?.data?.additionalRequirements
  const addProps = new Map();
  addProps.set("email", "email")
  addProps.set("address", "Адрес")
  addProps.set("index", "Индекс")
  addProps.set("pvzAddress", "Адрес ПВЗ")
  addProps.set("phoneNumber", "Номер телефона")

  const showMap = new Map()

  const additional = addReq?.flatMap(ar => ar.values)
  additional && additional.length !== 0
  && additional.forEach(
      it => addProps.get(it) && showMap.set(it, addProps.get(it)))
  showMap.size === 0 && addProps.forEach((v, k) => showMap.set(k, v))
  showMap.set("name", "Фамилия Имя Отчество")
  showMap.set("email", "Email")
  showMap.set("comment", "Комментарий")

  addMap?.forEach((v,k) => showMap.set(k, v))
  return  [...showMap]
      .filter(k=> !!eval(`order?.data?.${k[0]}`))
      .map(k => <p>{k[1]}:<span>{eval('order.data.' + k[0])}</span></p>)
}