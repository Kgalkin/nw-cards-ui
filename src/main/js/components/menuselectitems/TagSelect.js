import React from "react";
import {connect} from "react-redux";
import {addActiveTags, clearItems, LOADING} from "../../reducers/actions";
import Select from "react-select";
import "./TagSelect.scss"

export const className = 'tagSelect'

class TagSelect extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTags: [],
    }
  }

  handleTags = (selectedTags, triggeredAction) => {
    this.setState({selectedTags: selectedTags || []})
    this.props.addActiveTags({
      activeTags: (selectedTags || []).map(it => it.value),
      tagsMethod: "and"
    });
    this.props.clearItems();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const tags = nextProps.tags;
    return {selectedTags: tags.activeTags?.map(it =>
        ({value: it, label: tags.values.filter(tag => tag.id === it)[0]?.value}))}
  }

  render() {
    return (
        <Select
            className={className}
            isMulti={true}
            isLoading={this.props?.tags?.state === LOADING}
            isDisabled={this.props?.tags?.state === LOADING}
            onChange={this.handleTags}
            value={this.state.selectedTags}
            options={this.props.tags.values.map(
                i => ({value: i.id, label: i.value}))}
            placeholder = 'Поиск'
        />);
  }
}

export default connect(state => ({tags: state.tags}),
    {addActiveTags, clearItems})(TagSelect)