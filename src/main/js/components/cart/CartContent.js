import React, {Component} from 'react'
import {connect} from "react-redux";
import "./CartContent.scss"
import {clearCart, hideModal, showModal} from "../../reducers/actions";
import CartContentRow from "./CartContentRow";
import {isEmptyObj} from "../../utils/utils";
import {ORDER_FORM_MODAL} from "../../reducers/modal";
import {requestInStockUpdate} from "./CartUtils";
import {getBonuses} from "../../utils/apiUtils";
import {bonusProcessor} from "../../utils/bonusUtils";

const createItem = item => {
  return {
    id: item[0],
    ...item[1]
  };
};

String.prototype.interpolate = function (params) {
  const names = Object.keys(params);
  const vals = Object.values(params);
  return new Function(...names, `return \`${this}\`;`)(...vals);
}

const globalMessageId = 'globalMessage';

class CartContent extends Component {
  constructor(props) {
    super(props);
    this.className = "сartContent";
    this.state = {bonuses: null};
  }

  componentDidMount() {
    requestInStockUpdate(Object.keys(this.props.cartContent));
    getBonuses().then(bonuses => this.setState({bonuses}));
  }

  render() {
    const {
      cartContent,
      clearCart,
      hideModal,
      showModal
    } = this.props;
    const content = [];
    if (isEmptyObj(cartContent)) {
      hideModal();
    }
    const contentArray = this.processBonuses(
        this.countTotal(Object.values(cartContent || {})),
        this.state.bonuses);
    const totalPrice = contentArray
    .map(it => it.total)
    .reduce((a, b) => a + b, 0);
    console.log(contentArray);
    const idsAndMessages = this.processTags(totalPrice, contentArray);
    this.processCount(idsAndMessages, contentArray);
    content.push(<CartContentRow key={content.length}
                                 item={{
                                   id: null,
                                   data: {
                                     title: "Название"
                                   },
                                   count: "Количество",
                                   price: "Цена, руб",
                                   total: "Итого, руб"
                                 }}/>);
    contentArray.forEach((item) => {
      content.push(<CartContentRow key={content.length}
                                   item={item}
                                   errorMessages={idsAndMessages[item.id]}/>);
    });
    content.push(<CartContentRow key={content.length}
                                 item={{
                                   id: null,
                                   title: "",
                                   count: "",
                                   price: "",
                                   total: totalPrice
                                 }}/>);

    return <div className={this.className}>
      <div className={`${this.className}_grid`}>{content}</div>
      {idsAndMessages[globalMessageId]?.map(
          it => <div className={`${this.className}_globalError`}
                     dangerouslySetInnerHTML={{__html: it}}/>)}
      <div className={`${this.className}_buttonContainer`}>
        <button onClick={() => {
          clearCart();
          hideModal();
        }}>Очистить корзину
        </button>
        <button disabled={!isEmptyObj(idsAndMessages)}
                onClick={() => {
                  requestInStockUpdate(Object.keys(cartContent))
                  .then(it => {
                    if (!Object.entries(cartContent)
                    .some(it => it[1].count > it[1].inStock)) {
                      showModal({modalType: ORDER_FORM_MODAL});
                    }
                  });
                }}>Перейти к оформлению
        </button>
      </div>
    </div>
  }

  processTags = (totalPrice, contentArray) => {
    const usedTags = new Set();

    contentArray.some(it => it.tags.forEach(t => usedTags.add(t)));

    let idsAndMessages = {};
    usedTags.forEach(t => {
      const currentTag = this.props.tags.values.filter(tag => {
        return tag.id === t
      })[0];

      const constraints = currentTag?.data?.constraints
      if (constraints) {
        constraints.forEach(constraint => {
          switch (constraint?.type) {
            case "allowCountOnTotalPrice":
              const totalPriceWithoutThis = contentArray
              .filter(c => !c.tags.includes(t))
              .map(it => it.count * it.price)
              .reduce((a, b) => a + b, 0);
              const itemsInCart = contentArray
              .filter(c => c.tags.includes(t))
              .map(it => it.count)
              .reduce((a, b) => a + b, 0);

              const maxAllowedItems = Math.trunc(
                      totalPriceWithoutThis / constraint.forPrice)
                  * constraint.count;

              const haveToAdd =
                  constraint.forPrice *
                  Math.ceil(itemsInCart / constraint.count)
                  - totalPriceWithoutThis;

              let invalidItems;
              if (constraint.shareWithAll) {
                if (itemsInCart > maxAllowedItems) {
                  invalidItems = contentArray
                  .filter(c => c.tags.includes(t))
                  .map(c => {
                    const current = idsAndMessages[c.id];
                    const message = constraint.message.interpolate({
                      maxAllowedItems,
                    });
                    idsAndMessages[c.id] = current
                        ? current.concat(message) : [message];
                    return c.data.title;
                  })
                }
              } else {
                invalidItems = contentArray
                .filter(c => c.tags.includes(t))
                .filter(c => {
                  if (c.count > maxAllowedItems) {
                    const current = idsAndMessages[c.id];
                    const message = constraint.message.interpolate({
                      maxAllowedItems,
                    });
                    idsAndMessages[c.id] = current
                        ? current.concat(message) : [message];
                    return true
                  }
                })
                .map(c => c.data.title);
              }

              if (invalidItems?.length > 0) {
                const globals = idsAndMessages[globalMessageId];
                const globalMessage = constraint.globalMessage?.interpolate({
                  invalidItems,
                  itemsInCart,
                  maxAllowedItems,
                  haveToAdd
                });
                if (globalMessage) {
                  idsAndMessages[globalMessageId] = globals ?
                      globals.concat(globalMessage) : [globalMessage]
                }
              }
              break
            default:
          }
        })
      }
    });
    return idsAndMessages;
  }

  processCount = (idsAndMessages, contentArray) => {
    contentArray.forEach(it => {
      if (it.count > it.inStock) {
        const message = `В наличии только ${it.inStock}`;
        const item = idsAndMessages[it.id];
        idsAndMessages[it.id] = item ? item.concat(message) : [message]
      }
    })
  }

  countTotal = items => {
    items.forEach(item => item.total = item.count * item.price)
    return items;
  }

  processBonuses = (items, bonuses) => {return bonusProcessor(items, bonuses, (i, iw, items) => {
    console.log("Item to modify: ")
    console.log(i)
    const wrappedCount = (i.count / iw.countToWrap) | 0
    const notWrappedCount = i.count % iw.countToWrap;
    i.total = notWrappedCount * i.price + wrappedCount * iw.newPriceOf*i.price;
  })}

}

export default connect(
    state => ({cartContent: state.cartItems, tags: state.tags}),
    {clearCart, hideModal, showModal})(CartContent);
