// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Loading from "react-loading";
import { getDetail, getComment } from "./actions";

import "./DetailPage.css";

import ReadDetail from "./readDetail/ReadDetail";

class DetailPage extends Component {
    componentDidMount() {
        const { showId } = this.props;
        if (showId) {
            this.props.getDetail(showId).then(() => this.props.getComment(showId));
        }
    }
    render() {
        const { fetchingData } = this.props;
        return (
            <div className="detail-page">
                {fetchingData ? (
                    <Loading delay={200} type="spin" className="loading" />
                ) : (
                    <ReadDetail />
                )}
            </div>
        );
    }
}

function mapStateToProps({ detailPage }) {
    const { showId, fetchingData, readable } = detailPage;
    return {
        showId,
        fetchingData,
        readable
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getDetail: id => dispatch(getDetail(id)),
        getComment: id => dispatch(getComment(id))
    };
}
export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(DetailPage)
);
