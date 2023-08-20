import React, {useEffect, useState} from "react";
import "./SearchLine.scss"
import Select from "react-select";
import {connect} from "react-redux";
import {LOADING} from "../../../reducers/actions";
import {useNavigate, useSearchParams} from "react-router-dom";

const className = 'admin_search'

function SearchLine(props) {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selected, setSelected] = useState(null);

  const handleTags = selectedTags => {
    setSelected(selectedTags || [])
  }

  useEffect(() => {
    if (props.tags) {
      setSelected(searchParams.get('tags')?.split(',')
      ?.map(it => Number(it))
      .filter(it => it)
      ?.map(it => ({
        value: it,
        label: props.tags.values.filter(tag => tag.id === it)[0]?.value
      }))
      .filter(it => it.value));
    }
  }, [props.tags]);

  return <div className={`${className}`}>
    <label>Тэги: </label>
    <Select
        className={`${className}_tags`}
        isMulti={true}
        isLoading={props.tags?.state === LOADING}
        isDisabled={props.tags?.state === LOADING}
        onChange={handleTags}
        value={selected}
        options={props.tags.values.map(i => ({value: i.id, label: i.value}))}
    />
    <button onClick={() => {
      navigate(`/admin/items?tags=${selected.map(it => it.value).join(
          ',')}&tagsMethod=and`);
    }}>Применить
    </button>
  </div>
}

export default connect(state => ({tags: state.tags}))(SearchLine);