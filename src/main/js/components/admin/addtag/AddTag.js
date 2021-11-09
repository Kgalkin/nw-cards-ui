import React, {Component} from 'react'

import CreatableSelect from 'react-select/creatable';
import {connect} from "react-redux";
import {LOADING, updateTags} from "../../../reducers/actions";
import {createTag, loadAllTags} from "../../../utils/apiUtils";

const createOption = (label) => {
    console.log("in createOption function");
    console.log(label);
    return {
        label: label.toLowerCase().replace(/\W/g, ''),
        value: label.toLowerCase().replace(/\W/g, ''),
    }
};

class AddTag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: props?.tags?.state === LOADING || false,
            value: []
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
        this.setState({value: newValue});
    };

    handleCreate = (inputValue) => {
        this.setState({isLoading: true});
        setTimeout(() => {
            const {value} = this.state;
            createTag(inputValue)
                .then((created) => {
                        this.setState({
                            isLoading: false,
                            value: [...value || [], created],
                        });
                    }
                );

        }, 1000);
    };

    render() {
        const {isLoading, value} = this.state;
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
                options={this.props.tags.values}
                value={value}
            />
        );
    }
}

export default connect(s => ({tags: s.tags}), {updateTags})(AddTag)