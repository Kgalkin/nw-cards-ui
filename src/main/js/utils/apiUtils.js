import store from "../reducers";
import {
  addItems,
  LOADING,
  setItemsLoading,
  updateItem,
  updateTags
} from "../reducers/actions";

export const HOST_AND_PORT = '';

export const getMenu = () => {
  return fetch(`${HOST_AND_PORT}/api/menu`)
  .then(response => response.json())
  .catch(alert)
}

export const loadItemsPage = (offset, size, tags) => {
  store.dispatch(setItemsLoading())
  let request = `${HOST_AND_PORT}/api/items?offset=${offset}&size=${size}`;
  if (tags && tags.length > 0) {
    request += `&tags=${tags.join(",")}`
  }
  return fetch(request)
  .then(r => {
    if (r.status < 200 && r.status >= 400) {
      throw Error("Запрос завершился с ошибкой: " + r.status)
    }
    return r;
  })
  .then(response => response.json())
  .catch(alert)
  .then(r => store.dispatch(addItems(r)))
};

export const requestPayment = orderId => {
  return fetch(`${HOST_AND_PORT}/api/orders/${orderId}/requestPayment`)
  .catch(alert)
}

export const loadItemsIds = (ids) => {
  return fetch(
      `${HOST_AND_PORT}/api/items?ids=${ids.join(",")}&size=${ids.length}`)
  .then(r => {
    if (r.status < 200 && r.status >= 400) {
      throw Error("Запрос завершился с ошибкой: " + r.status)
    }
    return r;
  })
  .then(r => r.json())
  .catch(alert)
}

export const loadOrderByUuid = uuid => {
  return fetch(`${HOST_AND_PORT}/api/orders/${uuid}`)
  .catch(alert)
}

export const loadAllTags = () => {
  store.dispatch(updateTags({state: LOADING}));
  return fetch(`${HOST_AND_PORT}/api/tags`)
  .then(response => response.json())
  .catch(alert)
  .then(updateTagsFromResponse);
};

export const loadDeliveryOptions = () => {
  return fetch(`${HOST_AND_PORT}/api/deliveryOptions`)
  .then(r => r.json())
}

const updateTagsFromResponse = (r) => {
  store.dispatch(updateTags(
      {state: null, values: r}));
  return r;
};

//private
export const createTag = tag => {
  store.dispatch(updateTags({state: LOADING}));
  return withAuth(`${HOST_AND_PORT}/api/tags`, {
    method: 'POST',
    body: `["${tag}"]`
  }).then(response => response.json())
  .catch(alert)
  .then(r => updateTagsFromResponse(r)
  .filter(t => t.value === tag)[0]);

};

export const patchItem = item => {
  return withAuth(`${HOST_AND_PORT}/api/items/${item.id}`, {
    method: 'PATCH',
    body: JSON.stringify(item)
  }).then(response => response.json())
  .catch(alert)
  .then(r => {
    store.dispatch(updateItem({item: r}));
    return r;
  })
}

export const loadOrders = state => {
  return withAuth(`${HOST_AND_PORT}/api/orders?state=${state}`)
  .then(r => r.json())
  .catch(alert)
}

export const patchOrder = (id, formData) => {
  return withAuth(`${HOST_AND_PORT}/api/orders/${id}`, {
    method: 'PATCH',
    body: formData
  })
}

export const login = (login, password) => {
  localStorage.setItem("auth", JSON.stringify({login, password}))
  return withAuth(`${HOST_AND_PORT}/api/login`)
  .then(r => {
    if (r.status !== 200) {
      localStorage.removeItem("auth")
      throw r.text().then(text => {
        alert(text)
        return text;
      })
    }
  })
}

export const withAuth = (url, params) => {
  let auth = JSON.parse(localStorage.getItem("auth"))
  params = {
    ...params,
    headers: {
      ...params?.headers,
      Authorization: "Basic " + btoa(`${auth.login}:${auth.password}`)
    }
  }
  return fetch(url, params)
}