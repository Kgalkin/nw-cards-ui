import {HOST_AND_PORT} from "./utils";
import store from "../reducers";
import {LOADING, updateTags} from "../reducers/actions";

export const PAGE_SIZE = 20;
const mock = false;

export const loadItemsPage = (pageNumber) => {
    return fetch(`${HOST_AND_PORT}/api/items?offset=${pageNumber * PAGE_SIZE}&size=${PAGE_SIZE}`)
        .then(response => response.json())
        .catch(err => {
            if (mock) {
                let children = [];
                let tags = [];
                const price = 15;
                const inStock = 10;
                for (let i = 0; i < 20; i++) {
                    const id = i;
                    const title = "Заголовок " + i;
                    const description = "Описание товара №" + i;
                    tags.push(`${i}_tag`);
                    children.push({id, data: {title, description}, price, inStock, tags});
                }
                return children;
            } else alert(err);
        });
};

export const loadAllTags = () => {
    store.dispatch(updateTags({state: LOADING}));
    return fetch(`${HOST_AND_PORT}/api/tags`)
        .then(response => response.json())
        .catch(err => mock ? [
            {"value": "one", "id": 1},
            {"value": "two", "id": 2},
            {"value": "three", "id": 3},
            {"value": "four", "id": 4}] : alert(err))
        .then(updateTagsFromResponse);
};

const updateTagsFromResponse = (r) => {
    let tags = r.map(i => ({value: i.id, label: i.value}));
    store.dispatch(updateTags(
        {state: null, values: tags}));
    return tags;
};

export const createTag = tag => {
    store.dispatch(updateTags({state: LOADING}));
    return fetch(`${HOST_AND_PORT}/api/tags`, {
        method: 'POST',
        body: `["${tag}"]`
    }).then(response => response.json())
        .catch(err => mock ? {"label": tag, "value": 0} : alert(err))
        .then(r => updateTagsFromResponse(r).filter(t => t.label === tag)[0]);

};

export const debounce = (func, delay) => {
    let clearTimer;
    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(clearTimer);
        clearTimer = setTimeout(() => func.apply(context, args), delay);
    }
};