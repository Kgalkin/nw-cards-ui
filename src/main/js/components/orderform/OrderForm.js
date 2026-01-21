import React, {Component} from 'react'
import './OrderForm.scss'
import {clearCart} from "../../reducers/actions";
import {HOST_AND_PORT, loadDeliveryOptions} from "../../utils/apiUtils";
import Select from "react-select";
import {connect} from "react-redux";

const className = 'orderForm';
const errorClass = 'error';

class OrderForm extends Component {
  constructor() {
    super();
    this.newOrder = this.newOrder.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDeliveryOptionSelect = this.handleDeliveryOptionSelect.bind(
        this);
    this.state = {
      name: localStorage.getItem('name') || '',
      email: localStorage.getItem('email') || '',
      address: localStorage.getItem('address') || '',
      index: localStorage.getItem('index') || '',
      phoneNumber: localStorage.getItem('phoneNumber') || '',
      validationActive: false,
      country: '',
      deliveryOption: null,
      loading: false,
      deliveryOptions: null,
      comments: ''
    }
  }

  componentDidMount() {
    loadDeliveryOptions()
        .then(r => this.setState({deliveryOptions: r}))
  }

  render() {
    return <div className={className}>
      <div className={`${className}_info`}>
        <span className={`${className}_infoHeader`}>Информация по заказу</span>
        <div className={`${className}_name`}>
          <label>Фамилия Имя Отчество</label>
          <div>
            <input className={`${this.state.validationActive
            && !this.validateName()
                ? errorClass : ''}`}
                   placeholder={'ФИО'} value={this.state.name}
                   onChange={e => this.handleChange(e, 'name')}/>
            {this.state.validationActive && this.state.name
            && !this.validateName()
                ? <div className={`${className}_errorDescription`}>
                  Для отправления на почте РФ обязательны все 3 реквизита - Имя
                  Фамилия Отчество
                </div> : null
            }
          </div>
        </div>
        <div className={`${className}_email`}>
          <label>Электронная почта</label>
          <div>
            <input className={`${this.state.validationActive
            && !this.validateEmail() ? errorClass : ''}`}
                   placeholder={'Email'} value={this.state.email}
                   onChange={e => this.handleChange(e, 'email')}/>
          </div>
        </div>
        <div className={`${className}_address`}>
          <label>Адрес</label>
          <div>
                    <textarea className={`${this.state.validationActive
                    && !this.state.address ? errorClass : ''}`}
                              placeholder={'Адрес'} value={this.state.address}
                              onChange={e => this.handleChange(e, 'address')}/>
          </div>
        </div>
        <div className={`${className}_index`}>
          <label>Индекс</label>
          <div>
            <input
                className={`${this.state.validationActive && !this.state.index
                    ? errorClass : ''}`}
                placeholder={'Индекс'} value={this.state.index}
                onChange={e => this.handleChange(e, 'index')}/>
          </div>
        </div>
        <div className={`${className}_index`}>
          <label>Комментарии</label>
          <div>
            <textarea
                className={`${className}_comments`}
                placeholder={'Комментарии к заказу'} value={this.state.comments}
                onChange={e => this.handleChange(e, 'comments')}/>
          </div>
        </div>

      </div>
      <div className={`${className}_delivery`}>
        <span className={`${className}_deliveryHeader`}>Доставка</span>
        <div className={`${className}_deliverySelectCountry`}>
          <label>Укажите страну: </label>
          <Select
              className={`${this.state.validationActive && !this.state.country
                  ? errorClass : ''}`}
              value={this.state.country}
              onChange={e =>
                  this.setState({country: e, deliveryOption: null})}
              placeholder="Выберите страну"
              isSearchable={false}
              options={[{id: "RU", label: "Россия"},
                {id: "OTHER", label: "Другая"}]}>
          </Select>
        </div>
        {this.handleCountry()}
      </div>
      <button disabled={this.state.loading} onClick={() => {
        if (this.validateForm()) {
          this.newOrder(this.state.email, this.state.address, this.state.index,
              this.props.cartItems);
        }
      }}>Оформить заказ
      </button>
    </div>;
  }

  handleCountry() {
    return this.state.country?.id && <>{this.buildDeliveryOptions()}</>;
  }

  deliveryOption(deliveryOption, disabled) {
    return this.radioInput(
        `${deliveryOption.description} - ${deliveryOption.price} руб.`,
        deliveryOption.id,
        disabled,
        deliveryOption.data?.description,
        deliveryOption.data?.additionalRequirements
            ?.map(it => this.constructAdditionalInput(it, deliveryOption.id))
            ?.filter(it => it != null)
    );
  }

  constructAdditionalInput(additionalType, id) {
    return this.state.deliveryOption === id.toString() ? (
        <input style={{width: '40%'}}
               className={`${this.state.validationActive
               && !this.validateAdditionalReq(additionalType) ? errorClass : ''}`}
               placeholder={'Номер мобильного, 10 цифр'}
               value={this.state[additionalType]}
               onChange={e => this.handleChange(e, additionalType)}/>) : null;
  }

  validateAdditionalReq(type) {
    switch (type) {
      case 'phoneNumber':
        return this.state[type] && Number(this.state[type].replace(/\s/g, ''))
            ?.toString()
            ?.length === 10;
      default:
        return !!this.state[type];
    }
  }

  radioInput(label, value, disabled, text, additionalInlineBlock) {
    return <div key={value} className={`${className}_deliveryChoice`}>
      <label
          className={`${this.state.validationActive
          && !this.state.deliveryOption ? errorClass : ''}`}>
        <input disabled={disabled} type="radio" name="delivery"
               value={value}
               checked={Number(this.state.deliveryOption) === value}
               onChange={this.handleDeliveryOptionSelect}/>{label}
      </label> {additionalInlineBlock}
      {text ? <div
          className={`${className}_optionDescription`}>{text}</div> : null}
    </div>
  }

  handleChange(event, what) {
    localStorage.setItem(what, event.target.value);
    this.setState({[what]: event.target.value})
  }

  buildDeliveryOptions = () => {
    let options = [];
    //if there is priority on option it is counted as UNIQUE
    const sortedByPriority = Object.values(this.state.deliveryOptions || [])
        .sort((a, b) => {
          const apriority = a.data?.constraints?.map(it => it.priority)
              .reduce((f, s) => f > s ? f : s);
          const bpriority = b.data?.constraints?.map(it => it.priority)
              .reduce((f, s) => f > s ? f : s);
          return (bpriority || 0) - (apriority || 0);
        })
        .sort((a, b) => a.price > b.price ? 1 : -1);

    for (let number in sortedByPriority) {
      let option = sortedByPriority[number];
      let disabled = false;
      const failed = this.constraintsMatches(option.data?.constraints || []);
      if (failed) {
        if (!failed.text) {
          continue;
        }
        option = {
          ...option,
          data: {
            ...option.data,
            description: failed.text
          }
        }
        disabled = true;
      } else {
        if (option.data?.constraints?.map(it => it.priority)
            .reduce((f, s) => f > s ? f : s)) {
          return [this.deliveryOption(option, disabled)];
        }
      }
      options.push(this.deliveryOption(option, disabled));
    }
    return options;
  }

  constraintsMatches = (constraints) => {
    for (let i in constraints) {
      const constraint = constraints[i]
      if (!this.testConstraint(constraint)) {
        return constraint
      }
    }
    return null;
  }

  testConstraint = (constraint) => {
    switch (constraint.type) {
      case "country":
        return constraint.equals && constraint.equals
            === this.state.country.id
      case "totalPrice":
        return Object.entries(this.props.cartItems)
            .map(it => it[1])
            .map(it => (it.count || 0) * (it.price || 0))
            .reduce((a, b) => a + b) >= constraint.min
      case "tagData":
        let map = new Map();
        this.props.tags.values
            .filter(tag => tag.data && tag.data[`${constraint.fieldName}`])
            .forEach(it => map.set(it.id, it.data[`${constraint.fieldName}`]))
        const items = Object.entries(this.props.cartItems);
        let sum = 0;
        for (let i in items) {
          let it = items[i]
          let tags = it[1].tags;
          const itemWight = tags.map(tag => map.has(tag) && map.get(tag))
              .reduce((a, b) => a > b ? a : b);
          if (!itemWight && constraint.failOnAbsent) {
            return false;
          }
          sum += itemWight && itemWight * it[1].count;
        }
        if (constraint.max) {
          return sum <= (constraint.max < 0 ? 0 : constraint.max);
        }
        if (constraint.min) {
          return sum >= constraint.min;
        }
        return false;
      default:
        return false;
    }
  }

  newOrder() {
    const {
      name, email, address, index, deliveryOption, phoneNumber, comments
    } = this.state;
    let order = {
      data: {
        name,
        email,
        address,
        index,
        comments,
        phoneNumber,
        deliveryOption: {id: Number(deliveryOption)},
        items: []
      }
    };
    if (typeof ym !== 'undefined') {
      try {
        ym(90177751, 'reachGoal', 'create_order');
      } catch (e) {
        //ignore
      }
    }
    Object.values(this.props.cartItems).forEach(
        (v) => order.data.items.push({
          count: v.count,
          id: Number(v.id)
        }));
    this.setState({loading: true});
    fetch(`${HOST_AND_PORT}/api/orders`, {
      method: 'POST',
      body: JSON.stringify(order)
    })
        .then(response => {
              this.setState({loading: false});
              if (response.status === 201) {
                return response.json();
              } else {
                alert(
                    "Чтото пошло не так при создании заказа. Пожалуйста попробуйте позже.")
              }
            },
            error => {
              this.setState({loading: false});
              alert(
                  "Чтото пошло не так при создании заказа. Пожалуйста попробуйте позже.")
            })
        .then(json => {
          window.location.replace(`/orders/${json.uuid}`)
          this.props.clearCart();
        })
  }

  validateForm() {
    this.setState({validationActive: true});
    return this.validateDeliveryOption() &&
        this.validateName() &&
        this.validateEmail() &&
        this.state.address &&
        this.state.index &&
        this.state.country;
  }

  handleDeliveryOptionSelect(e) {
    if (e.target.checked) {
      this.setState({deliveryOption: e.target.value})
    }
  }

  validateEmail() {
    return this.state.email.match(
        '(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])');
  }

  validateName() {
    return this.state.name?.trim().split(' ').length >= 3;
  }

  validateDeliveryOption() {
    const selectedOption = this.getSelectedDeliveryOption();
    return selectedOption
        && selectedOption?.data?.additionalRequirements
            ?.map(it => this.validateAdditionalReq(it))
            ?.reduce((a,b) => a && b);
  }

  getSelectedDeliveryOption() {
    return this.state.deliveryOptions
        .filter(o => o.id.toString() === this.state.deliveryOption)[0] || null;
  }
}

export default connect(
    state => ({cartItems: state.cartItems, tags: state.tags}), {clearCart})(
    OrderForm)