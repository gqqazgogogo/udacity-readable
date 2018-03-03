// @flow
import React, { Component } from "react";

class Sort extends Component {
    render() {
        const { sortby, sort } = this.props;
        return (
            <div>
                <label>sortby:</label>
                <select value={sortby} onChange={event => sort(event)}>
                    <option value="vote">vote</option>
                    <option value="date">date</option>
                </select>
            </div>
        );
    }
}

export default Sort;
