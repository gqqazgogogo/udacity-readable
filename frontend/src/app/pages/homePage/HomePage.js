import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import Loading from "react-loading";

import Filter from "./filter/Filter";
import List from "./list/List";
import "./HomePage.css";

import {requestList, sortList, publicReadable} from "./actions";
import Creator from "../../components/creator/Creator";

class HomePage extends Component {
    updateList = (type : string) => {
        this.props.requestList(type);
    };

    sortList = (type : string) => {
        this.props.sortList(type);
    };

    createReadable = (data) => {
        console.log(data);
        const postParams = {
            title: data.theme,
            body: data.content,
            author: data.author,
            category: data.type
        }
        this.props.publicReadable(postParams);
    }

    render() {
        const {fetchingData, categories} = this.props;
        const [,...serverCategories] = categories;
        return (
            <div className="home-page">
                <h2 className="page-header">Welcome to Readable Project</h2>
                <Filter updateList={this.updateList} sortList={this.sortList}/> {fetchingData
                    ? (<Loading delay={200} type="spin" className="loading"/>)
                    : (
                        <div className="page">
                            <List/>
                            <Creator
																type="read"
                                title="Create a new readable"
                                types={serverCategories}
                                submit={this.createReadable}/>
                        </div>

                    )}
            </div>
        );
    }
}

function mapStateToProps({homePage}) {
    const {fetchingData, categories} = homePage;
    return {fetchingData, categories};
}

function mapDispatchToProps(dispatch) {
    return {
        requestList: categorie => dispatch(requestList(categorie)),
        sortList: sortby => dispatch(sortList({sortby})),
        publicReadable: readable => dispatch(publicReadable(readable))
    };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage));
