// @flow
import React, { Component } from "react";
import { connect } from "react-redux";

import "./List.css";

import { showDetail } from "../actions";
import Readable from '../readable/Readable';

class List extends Component {
    showDetail = (id: string) => {
        this.props.showDetail({ id });
    };
    render() {
        const { list } = this.props;

        return (
            <div className="readable-list">
                {list.map(readable => (
                    <Readable readable={readable} showDetail={this.showDetail} key={readable.id} />
                ))}
            </div>
        );
    }
}

function mapStateToProps({ homePage }) {
    const { list, sortby } = homePage;
    return {
        list,
        sortby
    };
}

function mapDispatchToProps(dispatch) {
    return {
        showDetail: id => dispatch(showDetail(id))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(List);
