import React, {useEffect, useState, useRef} from 'react'
import './OrderForm.scss'
import {clearCart} from "../../reducers/actions";
import {HOST_AND_PORT, loadDeliveryOptions} from "../../utils/apiUtils";
import Select from "react-select";
import {connect} from "react-redux";

const className = 'orderForm';
const errorClass = 'error';
const YA_WIDGET_TYPE = "ya_widget"

function OrderForm(props) {
  const [name, setName] = useState(localStorage.getItem('name') || '')
  const [email, setEmail] = useState(localStorage.getItem('email') || '')
  const [address, setAddress] = useState(localStorage.getItem('address') || '')
  const [index, setIndex] = useState(localStorage.getItem('index') || '')
  const [phoneNumber, setPhoneNumber] = useState(
      localStorage.getItem('phoneNumber') || '')
  const [validationActive, setValidationActive] = useState(false)
  const [country, setCountry] = useState('')
  const [deliveryOption, setDeliveryOption] = useState()
  const [deliveryOptions, setDeliveryOptions] = useState()
  const [comments, setComments] = useState('')
  const [pvzId, setPvzId] = useState()
  const [pvzAddress, setPvzAddress] = useState(
      localStorage.getItem('pvzAddress') || '')
  const [yaWidgetActive, setYaWidgetActive] = useState(false)
  const [yaWidgetStarted, setYaWidgetStarted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [deliveryPrice, setDeliveryPrice] = useState()
  const deliveryRef = useRef({})

  useEffect(() => {
    loadDeliveryOptions()
        .then(r => setDeliveryOptions(r))
    return () => setYaWidgetStarted(false)
  }, []);

  useEffect(() => {
    const selectedDelivery = getSelectedDeliveryOption()
    setYaWidgetActive(selectedDelivery?.data?.additionalRequirements?.some(
        it => it.type === YA_WIDGET_TYPE) && !pvzId)
  }, [deliveryOption]);

  useEffect(() => {
    if (yaWidgetActive) {
      createYaPvzWidget()
      deliveryRef?.current[deliveryOption]?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }

  }, [yaWidgetActive])

  useEffect(() => {pvzId && checkYaPrice()}, [pvzId]);

  const handleCountry = () => country?.id && <>{buildDeliveryOptions()}</>;

  const buildDeliveryOption = (option, disabled) => {
    return radioInput(
        (option.description + (option.price ? (" - " + option.price + " руб.")
            : "")),
        option.id,
        disabled,
        option.data?.description,
        option.data?.additionalRequirements
            ?.map(it => constructAdditionalInput(it, option.id))
            ?.filter(it => it != null)
    );
  }

  const constructAdditionalInput = (addReq, id) => {
    if (deliveryOption === id.toString()) {
      const singleValue = addReq?.values?.at(0);
      switch (addReq.type) {
        case "input":
          return <div>
            <label style={addReq.labelStyle}
                   className={"additional_requirement"}
                   htmlFor={singleValue}>{addReq.description}</label>
            <input id={singleValue}
                   style={{width: '40%'}}
                   disabled={addReq.disabled}
                   className={`${validationActive
                   && !validateAdditionalReq(addReq)
                       ? errorClass : ''}`}
                   placeholder={addReq.placeholder}
                   value={eval(singleValue)}
                   onChange={e => handleChange(e, singleValue)}/>
          </div>
        case "textarea":
          return <div>
            <label className={"additional_requirement"}
                   htmlFor={singleValue}
                   style={addReq.labelStyle}>{addReq.description}</label>
            <textarea id={singleValue}
                      className={`${validationActive
                      && !validateAdditionalReq(addReq) ? errorClass : ''}`}
                      placeholder={addReq.placeholder}
                      value={eval(singleValue)}
                      onChange={e => handleChange(e, singleValue)}/>
          </div>
        case YA_WIDGET_TYPE:
          return <>
            {pvzId && deliveryPrice ?
                <div>Выбран ПВЗ: <strong>{pvzAddress}</strong>, цена
                  доставки: <strong>{deliveryPrice} руб.</strong></div>
                : null}
            {yaWidgetActive ?
                <>
                  <div>{addReq.description}</div>
                  <div className={validationActive && !pvzId ? errorClass : ''}
                       key="delivery-widget" id="delivery-widget"></div>
                </>
                : <button className="ya_widget_show"
                          onClick={() => setYaWidgetActive(
                              true)}>Изменить</button>}
          </>
        default:
          return null
      }
    }
    return null;
  }

  const validateAdditionalReq = (addReq) => {
    return addReq?.values?.map(value => {
      switch (value) {
        case 'phoneNumber':
          return phoneNumber &&
              Number(phoneNumber.replace(/[\s()]/g, ''))
                  ?.toString()
                  ?.length === 10;
        default:
          return !!eval(value);
      }
    }).reduce((a, b) => a && b);
  }

  const radioInput = (label, value, disabled, text, additionalInlineBlock) => {
    return <div ref={el => deliveryRef.current[value] = el}
                key={value}
                className={`${className}_deliveryChoice`}>
      <label
          className={`${validationActive
          && !deliveryOption ? errorClass : ''}`}>
        <input disabled={disabled}
               type="radio"
               name="delivery"
               value={value}
               checked={Number(deliveryOption) === value}
               onChange={handleDeliveryOptionSelect}/>{label}
      </label>
      {text ? <div className={`${className}_optionDescription`}>{text}</div>
          : null}
      {additionalInlineBlock ? <div
              className={`${className}_deliveryChoice_additional`}>{additionalInlineBlock}</div>
          : null}
    </div>
  }

  const handleChange = (event, name) => {
    localStorage.setItem(name, event.target.value);
    eval(`set${name.replace(/^./, char => char.toUpperCase())}(
        event.target.value)`);
  }

  const buildDeliveryOptions = () => {
    let options = [];
    //if there is priority on option it is counted as UNIQUE
    const sortedByPriority = Object.values(deliveryOptions || [])
        .sort((a, b) => {
          const apriority = a.data?.constraints?.map(it => it.priority)
              .reduce((f, s) => f > s ? f : s);
          const bpriority = b.data?.constraints?.map(it => it.priority)
              .reduce((f, s) => f > s ? f : s);
          return (bpriority || 0) - (apriority || 0);
        })
        .sort((a, b) => a.id - b.id);

    for (let number in sortedByPriority) {
      let option = sortedByPriority[number];
      let disabled = false;
      const failed = constraintsMatches(option.data?.constraints || []);
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
          return [buildDeliveryOption(option, disabled)];
        }
      }
      options.push(buildDeliveryOption(option, disabled));
    }
    return options;
  }

  const constraintsMatches = (constraints) => {
    for (let i in constraints) {
      const constraint = constraints[i]
      if (!testConstraint(constraint)) {
        return constraint
      }
    }
    return null;
  }

  const testConstraint = (constraint) => {
    switch (constraint.type) {
      case "country":
        return constraint.equals && constraint.equals
            === country.id
      case "totalPrice":
        return Object.entries(props.cartItems)
            .map(it => it[1])
            .map(it => (it.count || 0) * (it.price || 0))
            .reduce((a, b) => a + b, 0) >= constraint.min
      case "tagData":
        let map = new Map();
        props.tags.values
            .filter(tag => tag.data && tag.data[`${constraint.fieldName}`])
            .forEach(it => map.set(it.id, it.data[`${constraint.fieldName}`]))
        const items = Object.entries(props.cartItems);
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

  const checkYaPrice = () => {
    const order = constructOrder();
    fetch(`${HOST_AND_PORT}/api/orders/checkdeliveryprice`, {
      method: 'POST',
      body: JSON.stringify(order)
    }).then(r => {
      if (r.status === 200) {
        return r.json();
      } else {
        alert(
            "Чтото пошло не так при создании заказа. Пожалуйста попробуйте позже./n"
            + r.body)
      }
    }, er => alert(er))
        .then(json => setDeliveryPrice(json.data.deliveryPrice))
  }

  const newOrder = () => {
    const order = constructOrder();
    setLoading(true);
    fetch(`${HOST_AND_PORT}/api/orders`, {
      method: 'POST',
      body: JSON.stringify(order)
    })
        .then(response => {
              setLoading(false);
              if (response.status === 201) {
                return response.json();
              } else {
                alert(
                    "Чтото пошло не так при создании заказа. Пожалуйста попробуйте позже.")
              }
            },
            error => {
              setLoading(false);
              alert(
                  "Чтото пошло не так при создании заказа. Пожалуйста попробуйте позже.\n"
                  + error)
            })
        .then(json => {
          window.location.replace(`/orders/${json.uuid}`)
          props.clearCart();
          if (typeof ym !== 'undefined') {
            try {
              ym(90177751, 'reachGoal', 'create_order');
            } catch (e) {
              //ignore
            }
          }
        })
  }

  const constructOrder = () => {
    let order = {
      data: {
        name,
        email,
        address,
        index,
        comments,
        phoneNumber,
        pvzId,
        pvzAddress,
        deliveryOption: {id: Number(deliveryOption)},
        items: []
      }
    };
    Object.values(props.cartItems).forEach(
        (v) => order.data.items.push({
          count: v.count,
          id: Number(v.id)
        }));
    return order;
  }

  const validateForm = () => {
    setValidationActive(true);
    return validateDeliveryOption() &&
        validateName() &&
        validateEmail() &&
        country;
  }

  const handleDeliveryOptionSelect = (e) => {
    if (e.target.checked) {
      setDeliveryOption(e.target.value)
    }
  }

  const validateEmail = () => {
    return email.match(
        '(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])');
  }

  const validateName = () => {
    return name?.trim().split(' ').length >= 3;
  }

  const validateDeliveryOption = () => {
    const selectedOption = getSelectedDeliveryOption();
    return selectedOption
        && selectedOption.data && (selectedOption.data?.additionalRequirements
                ?.map(it => validateAdditionalReq(it))
                ?.reduce((a, b) => a && b)
            || !selectedOption.data.additionalRequirements);
  }

  const getSelectedDeliveryOption = () => {
    return deliveryOptions?.filter(o => o.id.toString() === deliveryOption)[0]
        || null;
  }

  const createYaPvzWidget = () => {
    const yaDeliveryOption = deliveryOptions?.filter(dopt => dopt.id === 7)[0]
    const pricePlus = Number(yaDeliveryOption
        ?.data
        ?.priceModifiers
        ?.filter(pm => pm.type === 'plus')[0]
        ?.value);

    const sourcePvzId = extractSourcePvzId(yaDeliveryOption);
    const height = Number(600 / (window.devicePixelRatio || 1)) + "px";

    (function (w) {
      function startWidget() {
        w.YaDelivery.createWidget({
          containerId: 'delivery-widget',         // Идентификатор HTML-элемента (контейнера), в котором будет отображаться виджет
          params: {
            city: pvzAddress || address,                     // Город, отображаемый на карте при запуске
            size: {                              // Размеры виджета
              "height": height,              // Высота
              "width": "100%"                 // Ширина
            },
            source_platform_station: sourcePvzId, // Станция отгрузки
            physical_dims_weight_gross: 300,
            delivery_price: (price) => "Цену посчитаем после подтверждения"
            ,
            delivery_term: 5,          // Срок доставки
            show_select_button: true,           // Отображение кнопки выбора ПВЗ (false — скрыть кнопку, true — показать кнопку)
            filter: {
              type: [                         // Тип способа доставки
                "pickup_point",             // Пункт выдачи заказа
                "terminal"                  // Постамат
              ],
              is_yandex_branded: false,       // Тип пункта выдачи заказа (false — Партнерские ПВЗ, true — ПВЗ Яндекса)
              payment_methods: [              // Способ оплаты
                "already_paid"           // Доступна оплата картой при получении
              ],
              payment_methods_filter: "or"    // Фильтр по типам оплаты
            }
          },
        });
      }

      w.YaDelivery
          ? startWidget()
          : yaWidgetStarted || document.addEventListener('YaNddWidgetLoad',
          startWidget);
    })(window);

    if (!yaWidgetStarted) {
      const handleClick = (data) => {
        setYaWidgetActive(false)
        setPvzAddress(data.detail.address.full_address)
        localStorage.setItem('pvzAddress', data.detail.address.full_address)
        setPvzId(data.detail.id)
      }
      document.addEventListener('YaNddWidgetPointSelected', handleClick);
    }
    setYaWidgetStarted(true)
  }

  const extractSourcePvzId = deliveryOption => deliveryOption
      ?.data
      ?.additionalRequirements
      ?.filter(it => it.type===YA_WIDGET_TYPE)[0]
      ?.identifiers
      ?.sourcePvzId;

  return (
      <div className={className}>
        <div className={`${className}_info`}>
          <span
              className={`${className}_infoHeader`}>Информация по заказу</span>
          <div className={`${className}_name`}>
            <label>Фамилия Имя Отчество</label>
            <div>
              <input className={`${validationActive
              && !validateName()
                  ? errorClass : ''}`}
                     placeholder={'ФИО'} value={name}
                     onChange={e => handleChange(e, 'name')}/>
              {validationActive && name
              && !validateName()
                  ? <div className={`${className}_errorDescription`}>
                    Для отправления на почте РФ обязательны все 3 реквизита -
                    Имя
                    Фамилия Отчество
                  </div> : null
              }
            </div>
          </div>
          <div className={`${className}_email`}>
            <label>Электронная почта</label>
            <div>
              <input className={`${validationActive
              && !validateEmail() ? errorClass : ''}`}
                     placeholder={'Email'} value={email}
                     onChange={e => handleChange(e, 'email')}/>
            </div>
          </div>
          <div className={`${className}_index`}>
            <label>Комментарии</label>
            <div>
            <textarea
                className={`${className}_comments`}
                placeholder={'Комментарии к заказу'} value={comments}
                onChange={e => handleChange(e, 'comments')}/>
            </div>
          </div>

        </div>
        <div className={`${className}_delivery`}>
          <span className={`${className}_deliveryHeader`}>Доставка</span>
          <div className={`${className}_deliverySelectCountry`}>
            <label>Укажите страну: </label>
            <Select
                className={`${validationActive && !country
                    ? errorClass : ''}`}
                value={country}
                onChange={e => {
                  setCountry(e);
                  setDeliveryOption(null)
                }}
                placeholder="Выберите страну"
                isSearchable={false}
                options={[{id: "RU", label: "Россия"},
                  {id: "OTHER", label: "Другая"}]}>
            </Select>
          </div>
          {handleCountry()}
        </div>
        <button disabled={loading} onClick={() => {
          if (validateForm()) {
            newOrder();
          }
        }}>Оформить заказ
        </button>
      </div>);

}

export default connect(
    state => ({cartItems: state.cartItems, tags: state.tags}), {clearCart})(
    OrderForm)