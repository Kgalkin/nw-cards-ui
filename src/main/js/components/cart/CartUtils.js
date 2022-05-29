import {loadItemsIds} from "../../utils/apiUtils";
import store from "../../reducers";
import {updateInStock} from "../../reducers/actions";

export const requestInStockUpdate = items => {
  return loadItemsIds(items)
  .then(r => store.dispatch(updateInStock(r.items)))
}