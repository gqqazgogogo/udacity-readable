// @flow
import React, { Component } from 'react';
import {
	connect
} from 'react-redux';
import './Comment.css';
import Voter from '../../../components/voter/Voter';

class Comment extends Component {

	body$;

	componentWillMount() {
		this.body$ = this.props.comment.body;
	}

	render() {
		const { comment, vote, voting, deleteComment, editComment, touchCommentIndex } = this.props;
		return (
            <div className="comment">
                <div className="header">{comment.author}@{comment.date}:
									{ comment.id === touchCommentIndex
										? <div className="edit" onClick={event => {this.body$ = comment.body;editComment({id:comment.id, body:this.body}, 'confirm');}}>confirm</div>
										: null
									}
									{ comment.id === touchCommentIndex
										? <div className="edit" onClick={event => editComment({id:comment.id, body:this.body$}, 'cancel')}>cancel</div>
										: <div className="edit" onClick={event => editComment({id:comment.id}, 'toggle')}>edit</div>
									}
									<div className="delete" onClick={event => deleteComment(comment.id)}>Delete</div>
								</div>
							  { comment.id === touchCommentIndex
									? <textarea value={comment.body} onChange={event => editComment({id:comment.id, body:event.target.value}, 'edit')}></textarea>
									: <div className="content">{comment.body}</div> }
                <Voter id={comment.id} vote={vote} voting={voting} voteScore={comment.voteScore} />
            </div>
		);
	}
}

function mapStateToProps( {
	detailPage
} ) {
	const {
		touchCommentIndex
	} = detailPage;
	return {
		touchCommentIndex
	};
}

export default connect( mapStateToProps )( Comment );
