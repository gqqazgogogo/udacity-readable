// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./List.css";

import { showDetail } from "../actions";

class List extends Component {
    showDetail = (id: string) => {
        this.props.showDetail({ id });
    };
    render() {
        const { list, sortby } = this.props;
        let sortedList = [];
        if (sortby === "vote") {
            sortedList = list.sort((a, b) => {
                return a.voteScore < b.voteScore;
            });
        } else {
            sortedList = list.sort((a, b) => {
                return a.timestamp > b.timestamp;
            });
        }

        return (
            <div className="readable-list">
                {sortedList.map(readable => (
                    <div className="readable" key={readable.id}>
                        <div className="header">
                            <div className="left">
                                [<span className="category">
                                    {readable.category}
                                </span>]
                                <Link
                                    onClick={() => this.showDetail(readable.id)}
                                    to="/detail"
                                    className="title"
                                >
                                    {readable.title}
                                </Link>
                            </div>
                            <div className="right">
                                <span className="vote">
                                    vote:<span
                                        className={`score ${
                                            readable.voteScore > 0
                                                ? "up"
                                                : "down"
                                        }`}
                                    >
                                        {readable.voteScore}
                                    </span>
                                </span>
                                <span className="commentCount">
                                    comment:({readable.commentCount})
                                </span>
                            </div>
                        </div>
                        <div className="content">
                            <div className="body">{readable.body}</div>
                        </div>
                        <div className="footer">
                            <span className="date">{readable.date}</span>
                            <span className="author">
                                post by:{readable.author}
                            </span>
                        </div>
                    </div>
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
