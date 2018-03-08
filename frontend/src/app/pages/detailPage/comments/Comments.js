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
	removeComment,
	changeCommentEdit,
	editCommentChanged
} from '../actions';
import { editComment } from '../../../../utils/api';

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

	editComment = (info, type) => {
		if (type === 'cancel') {
			this.props.editCommentChanged(info.id, info.body);
			this.props.changeCommentEdit(null);
		} else if (type === 'toggle' && this.props.touchCommentIndex === null) {
			this.props.changeCommentEdit(info.id);
		} else if (type === 'confirm') {
			editComment(info.id, info.body).then(comment => {
				this.props.changeCommentEdit(null);
			});
		} else if (type === 'edit') {
			this.props.editCommentChanged(info.id, info.body);
		}
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
					<Comment key={comment.id} comment={comment} vote={this.vote} editComment={this.editComment} deleteComment={this.deleteComment} />
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
		sortby,
		touchCommentIndex
	} = detailPage;
	return {
		comments,
		sortby,
		touchCommentIndex
	};
}

function mapDispatchToProps( dispatch ) {
	return {
		voteDocComment: ( showId, option, index ) => dispatch( voteDocComment( showId, option, index ) ),
		sortList: sortby => dispatch( sortList( sortby ) ),
		removeComment: id => dispatch( removeComment( id ) ),
		changeCommentEdit: id => dispatch ( changeCommentEdit( id ) ),
		editCommentChanged: (id, body) => dispatch( editCommentChanged(id, body) )
	};
}

export default connect( mapStateToProps, mapDispatchToProps )( Comments );
