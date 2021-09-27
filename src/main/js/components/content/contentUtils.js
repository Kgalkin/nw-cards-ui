import {HOST_AND_PORT} from "../../utils/utils";
import store from "../../reducers";
import {LOADING, updateTags} from "../../reducers/actions";

export const PAGE_SIZE = 20;

export const loadItemsPage = (pageNumber) => {
    return fetch(`${HOST_AND_PORT}/api/items?offset=${pageNumber*PAGE_SIZE}&size=${PAGE_SIZE}`)
        .then(response => response.json())
        .catch(() => {
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
        });
};

export const loadAllTags = () => {
    store.dispatch(updateTags({state: LOADING}));
    return fetch(`${HOST_AND_PORT}/api/tags`)
        .then(response => response.json(), err => alert(err))
        .then(r => store.dispatch(updateTags(
            {state: null, values: r.map(i => ({value: i, label: i}))})));
};

export const debounce = (func, delay) => {
    let clearTimer;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(clearTimer);
        clearTimer = setTimeout(() => func.apply(context, args), delay);
    }
};