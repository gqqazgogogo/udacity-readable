// @flow
import React, { Component } from 'react';
import './Comment.css';
import Voter from '../../../components/voter/Voter';

class Comment extends Component {
	render() {
		const { comment, vote, voting, deleteComment } = this.props;
		return (
            <div className="comment">
                <div className="header">{comment.author}@{comment.date}: <div className="delete" onClick={event => deleteComment(comment.id)}>Delete</div></div>
                <div className="content">{comment.body}</div>
                <Voter id={comment.id} vote={vote} voting={voting} voteScore={comment.voteScore} />
            </div>
		);
	}
}

export default Comment;
