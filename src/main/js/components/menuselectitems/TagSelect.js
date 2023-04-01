import React from "react";
import {connect} from "react-redux";
import {clearItems, LOADING} from "../../reducers/actions";
import Select from "react-select";
import "./TagSelect.scss"
import {useNavigate, useSearchParams} from "react-router-dom";

export const className = 'tagSelect'

function TagSelect(props) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleTags = (selectedTags, triggeredAction) => {
    navigate(`/content?tags=${selectedTags.map(it => it.value).join(
        ',')}&tagsMethod=and`)
  }

  const selectedTags = searchParams.get('tags')?.split(',')
  ?.map(it => Number(it))
  .filter(it => it)
  ?.map(it => ({
    value: it,
    label: props.tags.values.filter(tag => tag.id === it)[0]?.value
  }))
  .filter(it => it.value)
  return (
      <Select
          className={className}
          isMulti={true}
          isLoading={props?.tags?.state === LOADING}
          isDisabled={props?.tags?.state === LOADING}
          onChange={handleTags}
          value={selectedTags}
          options={props.tags.values.filter(t => !t.isSystem)
          .map(i => ({value: i.id, label: i.value}))}
          placeholder='Поиск'
      />);
}

export default connect(state => ({tags: state.tags}),
    {clearItems})(TagSelect)