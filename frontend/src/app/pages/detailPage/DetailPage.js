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
        const { id } = this.props.match.params;
        if (id) {
            this.props.getDetail(id).then((res) => {
							if (res.payload.readable !== null) {
								this.props.getComment(id);
							} else {
								window.history.back();
							}
						});
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
