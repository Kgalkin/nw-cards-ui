import React, {Component} from 'react';
import "./Content.scss"
import VendorItem from "../vendoritem/VendorItem";
import {loadItemsPage} from "../../utils/apiUtils";
import {connect} from "react-redux";
import {LOADING} from "../../reducers/actions";
import {Loading} from "../loading/Loading";

export const PAGE_SIZE = 20;

export class Content extends Component {
  constructor(props) {
    super(props);
    this.className = "content";

    this.loadItems = () => {
      loadItemsPage(this.props.items.nextOffset, PAGE_SIZE,
          this.props.activeTags || [], this.props.tagsMethod);
    };
  }

  render() {
    return <div className={this.className}>
      <div className={`${this.className}_itemContainer`}>
        {this.constructItems()}
        {this.props.items.state === LOADING && <Loading/>}
      </div>
    </div>
  }

  componentDidMount() {
    window.addEventListener('scroll', () => {
      if (((this.props.items.items.length % PAGE_SIZE === 0)
          && document.scrollingElement.scrollHeight
          / (document.scrollingElement.scrollTop
              + document.scrollingElement.scrollWidth) < 1.2
          && this.props.items.state !== LOADING)) {
        this.loadItems();
      }
    });
    this.loadItems();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.items.state !== LOADING && this.props.items.totalCount
        === undefined) {
      this.loadItems()
    }
  }

  constructItems = () => {
    let children = [];
    this.props.items.items.forEach(i => {
          children.push(<VendorItem key={i.id} item={i}/>)
        }
    );
    return !children.length && this.props.items.state !== LOADING ?  <div className={`${this.className}_emptyContent`}>Здесь пока пусто</div> : children;
  }
}

export default connect(s => {
  console.log("Connecting content: ", s)
  return {
  activeTags: s.tags.activeTags,
  items: s.items
}}, null)(Content);