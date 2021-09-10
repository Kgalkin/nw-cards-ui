import React, {Component} from 'react';
import Select from 'react-select';
import {HOST_AND_PORT} from "../../utils/utils";
import {loadAllTags} from "../content/contentUtils";
import {connect} from "react-redux";
import {updateTags} from "../../reducers/actions";

 class CreateItem extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            files: [],
            price: null,
            description: null,
            title: null,
            count: null,
        }
    }

    handleChange(event) {
        this.setState({files: event.target.files});
    }

    componentDidMount() {
        loadAllTags();
    }

    async handleSubmit(e) {
        e.preventDefault();
        for (let i = 0; i < this.state.files.length; i++) {
            this.uploadFile(this.state.files[i]);
        }
        this.setState({files: []});
    }

    async uploadFile(file) {
        const formData = new FormData();

        formData.append("image", file);
        formData.append("data", JSON.stringify({price: 10, inStock: 10}));

        fetch(`${HOST_AND_PORT}/api/items`, {
            method: 'POST',
            body: formData
        });
    }

    render() {
        const {
            tags
        } = this.props;
        return <form onSubmit={this.handleSubmit}>
            <input type="file" id="file" multiple name="file" onChange={this.handleChange}/>
            <button type="submit" className="btn btn-info">Создать контент</button>
            <div>
                <input id="price"/>
                <label>Цена</label>
            </div>
            <div>
                <input id="inStock"/>
                <label>Количество</label>
            </div>
            <div>
                <textarea id="description"/>
                <label>Описание</label>
            </div>
            <div>
                <textarea id="title"/>
                <label>Заголовок</label>
            </div>
            <Select isMulti = {true} options = {tags.values}/>
        </form>
    }
}

export default connect(s => ({tags: s.tags}), {updateTags})(CreateItem)