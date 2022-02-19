import {HOST_AND_PORT} from "./utils";
import store from "../reducers";
import {addItems, LOADING, setItemsLoading, updateItem, updateTags} from "../reducers/actions";

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
        .then(response => response.json())
        .catch(alert)
        .then(r => store.dispatch(addItems(r)))
};

export const loadItemsIds = (ids) => {
    return fetch(`${HOST_AND_PORT}/api/items?ids=${ids.join(",")}&size=1000`)
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

const updateTagsFromResponse = (r) => {
    store.dispatch(updateTags(
        {state: null, values: r}));
    return r;
};

export const createTag = tag => {
    store.dispatch(updateTags({state: LOADING}));
    return fetch(`${HOST_AND_PORT}/api/tags`, {
        method: 'POST',
        body: `["${tag}"]`
    }).then(response => response.json())
        .catch(alert)
        .then(r => updateTagsFromResponse(r)
            .filter(t => t.value === tag)[0]);

};

export const patchItem = item => {
    return fetch(`${HOST_AND_PORT}/api/items/${item.id}`, {
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
    return fetch(`${HOST_AND_PORT}/api/orders?state=${state}`)
        .then(r => r.json())
        .catch(alert)
}

export  const loadDeliveryOptions = () => {
   return  fetch(`${HOST_AND_PORT}/api/deliveryOptions`)
        .then(r => r.json())
}

export const debounce = (func, delay) => {
    let clearTimer;
    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(clearTimer);
        clearTimer = setTimeout(() => func.apply(context, args), delay);
    }
};