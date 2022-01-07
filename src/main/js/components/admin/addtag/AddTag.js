import React, {Component} from 'react'

import CreatableSelect from 'react-select/creatable';
import {connect} from "react-redux";
import {LOADING, updateTags} from "../../../reducers/actions";
import {createTag, loadAllTags} from "../../../utils/apiUtils";

class AddTag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: props?.tags?.state === LOADING || false,
            selected: []
        }
    }

    componentDidMount() {
        loadAllTags();
    }

    handleChange = (
        newValue,
        actionMeta
    ) => {
        console.group('Value Changed');
        console.log(newValue);
        console.log(`action: ${actionMeta.action}`);
        console.groupEnd();
        this.setState({selected: newValue});
    };

    handleCreate = (inputValue) => {
        this.setState({isLoading: true});
        const {selected} = this.state;
        createTag(inputValue)
            .then((created) => {
                console.log("Created")
                console.log(created)
                    this.setState({
                        isLoading: false,
                        selected: [...selected || [], {value: created.id, label: created.value}],
                    });
                }
            );
    };

    render() {
        const {isLoading, selected} = this.state;
        console.group("render");
        console.log("in Render");
        console.log(this.props);
        console.groupEnd();
        return (
            <CreatableSelect
                isMulti={true}
                isClearable
                isDisabled={this.props?.tags?.state === LOADING || isLoading}
                isLoading={this.props?.tags?.state === LOADING || isLoading}
                onChange={this.handleChange}
                onCreateOption={this.handleCreate}
                options={this.props.tags.values.map(i => ({value: i.id, label: i.value}))}
                value={selected}
            />
        );
    }
}

export default connect(s => ({tags: s.tags}), {updateTags})(AddTag)