// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Sort from "../../../components/sort/Sort";
import { requestCategories } from "./actions";
import "./Filter.css";

class Filter extends Component {
  componentDidMount() {
    this.props.requestCategories().then(() => {
			if (this.props.categorie === null) {
				this.updateList("all");
			}
    });
  }
  updateList(type: string) {
    this.props.updateList(type);
  }
  sortList = event => {
    this.props.sortList(event.target.value);
  };
  render() {
    const { categorie, categories, sortby } = this.props;
    return (
      <div className="categories">
        {categories.map(cate => (
          <Link
            to={cate.name}
            key={cate.name}
            className={`categorie ${cate.name === categorie ? "actived" : ""}`}
            onClick={() => this.updateList(cate.name)}
          >
            {cate.name}
          </Link>
        ))}
        <Sort sortby={sortby} sort={this.sortList} />
      </div>
    );
  }
}

function mapStateToProps({ homePage }) {
  const { categorie, categories, sortby } = homePage;
  return {
    categorie,
    categories,
    sortby
  };
}

function mapDispatchToProps(dispatch) {
  return {
    requestCategories: data => dispatch(requestCategories())
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Filter);
