import React, {Component} from 'react'

import CreatableSelect from 'react-select/creatable';
import {connect} from "react-redux";
import {LOADING, updateTags} from "../../../reducers/actions";
import {createTag} from "../../../utils/apiUtils";

class AddTag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initiated: false,
            selected: []
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!this.state.initiated
            && this.props.tags.values.length > 0
            && this.props.initTags?.length > 0) {
            this.setState({
                initiated: true,
                selected: this.props.tags.values
                    .filter(tag => this.props.initTags.includes(tag.id))
                    .map(tag => ({value: tag.id, label: tag.value}))
            })
        }
    }

    handleChange = (
        newValue,
        actionMeta
    ) => {
        this.setState({selected: newValue});
    };

    handleCreate = (inputValue) => {
        this.setState({isLoading: true});
        const {selected} = this.state;
        createTag(inputValue)
            .then((created) => {
                    this.setState({
                        isLoading: false,
                        selected: [...selected || [], {value: created.id, label: created.value}],
                    });
                }
            );
    };

    render() {
        const {selected} = this.state;
        return (
            <CreatableSelect
                isMulti={true}
                isClearable
                isDisabled={this.props.disabled || this.props?.tags?.state === LOADING}
                isLoading={this.props?.tags?.state === LOADING}
                onChange={this.handleChange}
                onCreateOption={this.handleCreate}
                options={this.props.tags.values.map(i => ({value: i.id, label: i.value}))}
                value={selected}
            />
        );
    }
}

export default connect(s => ({tags: s.tags}), {updateTags}, null, {forwardRef: true})(AddTag)