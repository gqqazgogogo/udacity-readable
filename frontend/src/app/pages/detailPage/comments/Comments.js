// @flow
import React, {
	Component
} from 'react';
import {
	connect
} from 'react-redux';
import './Comments.css';
import Comment from '../comment/Comment';
import Sort from '../../../components/sort/Sort';
import {
	voteDocComment,
	sortList,
	removeComment
} from '../actions';

class Comments extends Component {
	vote = ( id, option ) => {
		if ( !this.props.voting ) {
			for ( let i = 0; i < this.props.comments.length; i++ ) {
				if ( this.props.comments[ i ].id === id ) {
					this.props.voteDocComment( id, option, i );
					break;
				}
			}
		}
	};

	deleteComment = id => {
		this.props.removeComment(id);
	}

	sortList = event => {
		this.props.sortList( event.target.value );
	};
	render() {
		const {
			comments,
			sortby
		} = this.props;
		return (
			<div className="comment-list">
				{(comments.length > 0)? <div className="comment-header">Comments:</div> : null}
				{(comments.length > 0)? <Sort sortby={sortby} sort={this.sortList} /> : null}
				{comments.map(comment => (
					<Comment key={comment.id} comment={comment} vote={this.vote} deleteComment={this.deleteComment} />
				))}
			</div>
		);
	}
}

function mapStateToProps( {
	detailPage
} ) {
	const {
		comments,
		sortby
	} = detailPage;
	return {
		comments,
		sortby
	};
}

function mapDispatchToProps( dispatch ) {
	return {
		voteDocComment: ( showId, option, index ) => dispatch( voteDocComment( showId, option, index ) ),
		sortList: sortby => dispatch( sortList( sortby ) ),
		removeComment: id => dispatch( removeComment( id ) ),
	};
}

export default connect( mapStateToProps, mapDispatchToProps )( Comments );
