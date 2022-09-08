import React from "react";
import "./SearchLine.scss"
import Select from "react-select";
import {connect} from "react-redux";
import {addActiveTags, clearItems, LOADING} from "../../../reducers/actions";

const className = 'admin_search'

class SearchLine extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTags: []
    }
  }

  handleTags = selectedTags => {
    this.setState({selectedTags: selectedTags || []})
  }

  render() {
    return <div className={`${className}`}>
      <label >Тэги: </label>
      <Select
          className = {`${className}_tags`}
          isMulti={true}
          isLoading={this.props?.tags?.state === LOADING}
          isDisabled={this.props?.tags?.state === LOADING}
          onChange = {this.handleTags}
          options={this.props.tags.values.map(i => ({value: i.id, label: i.value}))}
      />
      <button onClick={() => {
          this.props.addActiveTags({
            activeTags: this.state.selectedTags.map(it => it.value),
            tagsMethod: "and"
          });
          this.props.clearItems();}}>Применить</button>
    </div>
  }
}

export default connect(state => ({tags: state.tags}), {addActiveTags, clearItems})(SearchLine);