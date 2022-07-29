import React, {Component} from 'react';
import Image from "../../image/Image";
import './EditableItem.scss'
import AddTag from "../addtag/AddTag";
import {
  HOST_AND_PORT,
  patchItem,
  updateItem,
  withAuth
} from "../../../utils/apiUtils";
import {isNumber} from "../../../utils/utils";
import {Textarea} from "../../textarea/Textarea";

export class EditableItem extends Component {
  constructor(props) {
    super(props);
    this.className = 'adminItem';
    this.tagInput = null;
    this.state = {
      editable: false,
      item: this.props.item,
      /*title: null,
      description: null,
      price: null,
      inStock: null,*/
    }
  }

  updateItem = (updItem) => {
    let item = this.state.item;
    updItem(item)
    this.setState({item});
  }

  render() {
    const {id, price, inStock, tags} = this.state.item;
    const {title, description, links} = this.state.item.data;

    return <div id={id} className={this.className}
                style={{opacity: inStock ? "1" : "50%"}}>
      <div>{`# ${id}`}</div>
      <textarea disabled={!this.state.editable}
                className={`${this.className}_title`}
                value={title} onChange={e =>
          this.updateItem(item => item.data.title = e.target.value)}/>
      <div className={`${this.className}_imageContainer`}>
        <Image links={links}/>
      </div>
      <div>
        <input className={`${this.className}_changeImage`}
               type="file" id="file" name="file"
               onChange={this.updateImage}/>
        <label htmlFor="file" className={`${this.className}_changeImageLabel`}>Заменить
          изображение</label>
      </div>
      <div className={`${this.className}_descriptionBlock`}>
        <div>
          <Textarea autosize={this.state.editable}
                    disabled={!this.state.editable}
                    className={`${this.className}_description`}
                    value={description} onChange={e =>
              this.updateItem(item => item.data.description = e.target.value)}/>
          <div><label>{`Цена: `}</label>
            <input disabled={!this.state.editable}
                   className={`${this.className}_price`}
                   value={price}
                   onChange={e =>
                       this.updateItem(item => item.price =
                           isNumber(e.target.value) ? Number(e.target.value)
                               : item.price)}/>
          </div>
          <div><label>{`В наличии: `}</label>
            <input disabled={!this.state.editable}
                   className={`${this.className}_inStock`}
                   value={inStock}
                   onChange={e =>
                       this.updateItem(item => item.inStock =
                           isNumber(e.target.value) ? Number(e.target.value)
                               : item.inStock)}/>
          </div>
        </div>
        <AddTag ref={el => this.tagInput = el} initTags={tags}
                disabled={!this.state.editable}/>
        <button className={`${this.className}_addButton`}
                onClick={this.state.editable ? this.save : this.edit}>
          {this.state.editable ? `Save` : `Edit`}
        </button>
      </div>
    </div>;
  }

  save = () => {
    this.setState({editable: false});
    this.state.item.tags = this.tagInput.state.selected.map(
        s => Number(s.value));
    patchItem(this.state.item)//save item
  };

  edit = () => {
    this.setState({editable: true});
  };

  adjustElementHeight = e => {
    e.style.height = "";
    e.style.height = e.scrollHeight + "px"
  }

  updateImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();

      formData.append("image", file);
      withAuth(`${HOST_AND_PORT}/api/items/${this.state.item.id}/image/cover`, {
        method: 'PATCH',
        body: formData
      }).then((r) => r.json())
      .then(it => this.setState({item: it}))
    }
  }

}