import React, {Component} from 'react';
import Image from "../../image/Image";
import './EditableItem.scss'

export class EditableItem extends Component {
    constructor(props) {
        super(props);
        this.className = 'adminItem';
        this.state = {
            editable: false,
            title: null,
            description: null,
            price: null,
            inStock: null,
            tags: []
        }
    }

    render() {
        const {
            id,
            title,
            description,
            price,
            inStock,
            tags
        } = this.props;

        return <div id={id} className={this.className}>
            <textarea disabled={!this.state.editable} className={`${this.className}_title`}
                      value={this.state.title || title} onChange={e =>
                this.setState({title: e.target.value})}/>
            <div className={`${this.className}_imageContainer`}>
                <Image id={id}/>
            </div>
            <div className={`${this.className}_descriptionBlock`}>
                <div>
                    <textarea disabled={!this.state.editable} className={`${this.className}_description`}
                              value={this.state.description || description} onChange={e =>
                        this.setState({description: e.target.value})}/>
                    <div><label>{`Цена: `}</label>
                        <input disabled={!this.state.editable} className={`${this.className}_price`} value={this.state.price || price}
                               onChange={e =>
                                   this.setState({price: e.target.value})}/>
                    </div>
                    <div><label>{`В наличии: `}</label>
                        <input disabled={!this.state.editable} className={`${this.className}_inStock`} value={this.state.inStock || inStock}
                               onChange={e =>
                                   this.setState({inStock: e.target.value})}/>
                    </div>
                </div>
                <button className={`${this.className}_addButton`}
                        onClick={this.state.editable ? this.save : this.edit}>
                    {this.state.editable ? `Save` : `Edit`}
                </button>
            </div>
        </div>;
    }

    save = () => {
        this.setState({editable: false});
        //save item
    };

    edit = () => {
        this.setState({editable: true});
    };

}