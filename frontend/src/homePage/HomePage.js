import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// import Modal from 'react-modal'
import Loading from "react-loading";

import Filter from "./filter/Filter";
import List from "./list/List";
import "./HomePage.css";

import { requestList, sortList } from "./actions";

class HomePage extends Component {
    updateList = (type: string) => {
        this.props.requestList(type).then(() => {
            this.sortList(this.props.sortby);
        });
    };

    sortList = (type: string) => {
        this.props.sortList(type);
    };

    render() {
        const { fetchingData } = this.props;
        return (
            <div className="home-page">
                <h2 className="header">Welcome to Readable Project</h2>
                <Filter updateList={this.updateList} sortList={this.sortList} />
                {fetchingData ? (
                    <Loading delay={200} type="spin" className="loading" />
                ) : (
                    <div className="page">
                        <List />
                    </div>
                )}
            </div>
        );
    }
}

function mapStateToProps({ homePage }) {
    const { fetchingData, sortby } = homePage;
    return {
        fetchingData,
        sortby
    };
}

function mapDispatchToProps(dispatch) {
    return {
        requestList: categorie => dispatch(requestList(categorie)),
        sortList: sortby =>
            dispatch(
                sortList({
                    sortby
                })
            )
    };
}
export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(HomePage)
);
