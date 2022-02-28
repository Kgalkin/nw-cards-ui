import React, {Component} from 'react';
import {connect} from "react-redux";
import {updateTags} from "../../../reducers/actions";
import './CreateItem.scss'
import AddTag from "../addtag/AddTag";
import {HOST_AND_PORT} from "../../../utils/utils";
import {withAuth} from "../../../utils/apiUtils";

class CreateItem extends Component {
    constructor(props) {
        super(props);
        this.tagInput = null;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            files: [],
            price: null,
            description: null,
            title: null,
            count: null,
            loading: false
        }
    }

    handleChange(event) {
        let filesArr = Array.prototype.slice.call(event.target.files);
        console.log(filesArr);
        this.setState({files: [...this.state.files, ...filesArr]});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log('Creating content');
        console.log(this.state.files.length);
        for (let i = 0; i < this.state.files.length; i++) {
            this.uploadFile(this.state.files[i]);
        }
        this.setState({files: []});
    }

    uploadFile = (file) => {
        console.log('Uploading file');
        const formData = new FormData();

        formData.append("image", file);
        formData.append("data", JSON.stringify({
            price: Number(this.state.price),
            inStock: Number(this.state.count),
            data: {title: this.state.title, description: this.state.description},
            tags: this.tagInput.state.selected.map(t => t.value)
        }));
        console.log();
        console.log(formData);

        this.setState({loading: true})
        withAuth(`${HOST_AND_PORT}/api/items`, {
            method: 'POST',
            body: formData
        }).then(() => this.setState({loading: false}))
    }

    render() {
        const {
            tags
        } = this.props;
        return this.state.loading ? <div>Loading...</div> :
            <form onSubmit={this.handleSubmit}>
                <div className="custom-file-upload">
                    <label>
                        <input type="file" id="file" multiple name="file" onChange={this.handleChange}/>
                        <i/> Добавить файлы
                    </label>
                    {this.state.files.map(x =>
                        <div className="file-preview">{x.name}</div>
                    )}
                </div>
                <button type="submit" className="btn btn-info">Создать контент</button>
                <div>
                    <input id="price" onChange={e => this.setState({price: e.target.value})}/>
                    <label>Цена</label>
                </div>
                <div>
                    <input id="inStock" onChange={e => this.setState({count: e.target.value})}/>
                    <label>Количество</label>
                </div>
                <div>
                    <textarea id="description" onChange={e => this.setState({description: e.target.value})}/>
                    <label>Описание</label>
                </div>
                <div>
                    <textarea id="title" onChange={e => this.setState({title: e.target.value})}/>
                    <label>Заголовок</label>
                </div>
                <AddTag ref={el =>
                    this.tagInput = el}/>
            </form>
    }
}

export default connect(s => ({tags: s.tags}), {updateTags})(CreateItem)