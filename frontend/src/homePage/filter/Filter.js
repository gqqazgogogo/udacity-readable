// @flow
import React, { Component } from "react";
import { connect } from "react-redux";

import { requestCategories } from "./actions";
import "./Filter.css";

class Filter extends Component {
    componentDidMount() {
        this.props.requestCategories().then(() => {
            this.updateList("all");
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
                    <span
                        onClick={() => this.updateList(cate.name)}
                        key={cate.name}
                        className={`categorie ${
                            cate.name === categorie ? "actived" : ""
                        } `}
                    >
                        {cate.name}
                    </span>
                ))}
                <label>sortby:</label>
                <select value={sortby} onChange={this.sortList}>
                    <option value="vote">vote</option>
                    <option value="date">date</option>
                </select>
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
