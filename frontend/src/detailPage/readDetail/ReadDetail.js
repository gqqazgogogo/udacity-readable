// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "react-modal";

import "./ReadDetail.css";
import Voter from "../voter/Voter";

class ReadDetail extends Component {
    closeVoteModal = () => {}
    render() {
        const { readable, voteModalOpen } = this.props;
        return (
            <div className="read-detail">
                <h2 className="header">
                    {readable.title ? readable.title : readable.error}
                </h2>
                <div className="info">
                    <span>Author:{readable.author}</span>
                    <span>Category:{readable.category}</span>
                    <span>Date:{readable.date}</span>
                </div>
                <div className="body">{readable.body}</div>
                <Voter />
                <Modal
                    appElement={document.getElementById("root")}
                    className="modal"
                    overlayClassName="overlay"
                    isOpen={voteModalOpen}
                    onRequestClose={this.closeVoteModal}
                    contentLabel="Modal"
                />
            </div>
        );
    }
}

function mapStateToProps({ detailPage }) {
    const { readable, voteModalOpen } = detailPage;
    return {
        readable,
        voteModalOpen
    };
}

export default connect(mapStateToProps)(ReadDetail);
