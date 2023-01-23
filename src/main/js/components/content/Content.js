import React, {useEffect} from 'react';
import "./Content.scss"
import VendorItem from "../vendoritem/VendorItem";
import {loadItemsPage} from "../../utils/apiUtils";
import {connect} from "react-redux";
import {clearItems, LOADING} from "../../reducers/actions";
import {Loading} from "../loading/Loading";
import {useSearchParams} from "react-router-dom";

export const PAGE_SIZE = 20;

function Content(props) {
  const [searchParams] = useSearchParams();

  useEffect(() => props.clearItems(), [searchParams])

  const loadItems = () => {
    loadItemsPage(props.items.nextOffset, PAGE_SIZE,
        searchParams.get('tags') || [],
        searchParams.get('tagsMethod'),
        searchParams.get('ids'));
  }
  const className = props.className || "content"

  const constructItems = props.constructItems
      || ((items) => {
        let children = [];
        items.filter(i => i.inStock > 0)
        .forEach(i => children.push(<VendorItem key={i.id} item={i}/>));
        return !children.length && props.items.state !== LOADING ? <div
                className={`${className}_emptyContent`}>Здесь пока пусто</div>
            : children;
      })

  const scrollHandler = () => {
    if (((props.items.items.length < props.items.totalCount)
        && document.scrollingElement.scrollHeight
        / (document.scrollingElement.scrollTop
            + document.scrollingElement.scrollWidth) < 1.2
        && props.items.state !== LOADING)) {
      loadItems();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler)
    if (props.items.totalCount === undefined && props.items.state !== LOADING) {
      loadItems();
    }
    return () => window.removeEventListener('scroll', scrollHandler)
  }, [props.items]);

  return <div className={className}>
    <div className={`${className}_itemContainer`}>
      {constructItems(props.items.items)}
      {props.items.state === LOADING && <Loading/>}
    </div>
  </div>

}

export default connect(s => ({items: s.items}), {clearItems})(Content);