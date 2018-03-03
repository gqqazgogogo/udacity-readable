import { getDocDetail, getComments, voteDoc, voteComment, postComment, deleteComment } from '../../../utils/api';
export const FETCH_DETAIL = 'FETCH_DETAIL';
export const RECEIVE_DETAIL = 'RECEIVE_DETAIL';
export const FETCH_COMMENT = 'FETCH_COMMENT';
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
export const VOTE_READ = 'VOTE_READ';
export const VOTE_READ_END = 'VOTE_READ_END';
export const VOTE_COMMENT = 'VOTE_COMMENT';
export const VOTE_COMMENT_END = 'VOTE_COMMENT_END';
export const SORT_COMMENTS = 'SORT_COMMENTS';
export const COMMENT_START = 'COMMENT_START';
export const COMMENT_END = 'COMMENT_END';
export const DELETE_COMMENT_START = 'DELETE_COMMENT_START';
export const DELETE_COMMENT_END = 'DELETE_COMMENT_END';
export const TOGGLE_EDIT = 'TOGGLE_EDIT';
export const EDIT_CHANGE = 'EDIT_CHANGE';
export const EDIT_CONFIRM = 'EDIT_CONFIRM';
export const EDIT_CANCEL = 'EDIT_CANCEL';
export const getDetail = id => (dispatch, getState) => {
	dispatch(fetchDetail());
	return getDocDetail(id)
		.then(readable => ({ ...readable,
			date: new Date(readable.timestamp)
				.Format('yyyy-MM-dd')
		}))
		.then(readable => dispatch(receiveDetail({
			readable
		})));
};
const fetchDetail = () => ({
	type: FETCH_DETAIL
});
const receiveDetail = ({ readable }) => ({
	type: RECEIVE_DETAIL,
	payload: {
		readable
	}
});
export const getComment = id => (dispatch, getState) => {
	dispatch(fetchComment());
	return getComments(id)
		.then(comments => comments.map(comment => ({ ...comment,
			date: new Date(comment.timestamp)
				.Format('yyyy-MM-dd')
		})))
		.then(comments => dispatch(receiveComment({
			comments
		})));
};
const fetchComment = () => ({
	type: FETCH_COMMENT
});
const receiveComment = ({ comments }) => ({
	type: RECEIVE_COMMENT,
	payload: {
		comments
	}
});
export const vote = (id: string, option: 'upVote' | 'downVote') => (dispatch, getState) => {
	dispatch(voteRead());
	return voteDoc(id, option)
		.then(readable => ({ ...readable,
			date: new Date(readable.timestamp)
				.Format('yyyy-MM-dd')
		}))
		.then(readable => dispatch(voteReadEnd(readable)));
};
const voteRead = () => ({
	type: VOTE_READ,
	payload: {
		voting: true
	}
});
const voteReadEnd = readable => ({
	type: VOTE_READ_END,
	payload: {
		readable
	}
});
export const voteDocComment = (id: string, option: 'upVote' | 'downVote', index) => (dispatch, getState) => {
	dispatch(voteCommentAction(index));
	return voteComment(id, option)
		.then(comment => ({ ...comment,
			date: new Date(comment.timestamp)
				.Format('yyyy-MM-dd')
		}))
		.then(comment => dispatch(voteCommentEndAction(comment)));
}
const voteCommentAction = (touchCommentIndex) => ({
	type: VOTE_COMMENT,
	payload: {
		touchCommentIndex
	}
});
const voteCommentEndAction = comment => ({
	type: VOTE_COMMENT_END,
	payload: {
		comment
	}
});
export const createComment = params => (dispatch, getState) => {
	dispatch(commentStart());
	return postComment(params)
		.then(comment => {
			dispatch(commentEnd(comment))
		});
}
const commentStart = () => ({
	type: COMMENT_START
});
const commentEnd = comment => ({
	type: COMMENT_END,
	payload: {
		comment
	}
});
export const removeComment = id => (dispatch, getState) => {
	dispatch(deleteCommentStart());
	return deleteComment(id)
		.then(res => dispatch(deleteCommentEnd(id)));
}
const deleteCommentStart = () => ({
	type: DELETE_COMMENT_START
});
const deleteCommentEnd = id => ({
	type: DELETE_COMMENT_END,
	payload: {
		id
	}
})
export const sortList = sortby => ({
	type: SORT_COMMENTS,
	payload: {
		sortby
	}
});


export const toggleEdit = () => ({
	type: TOGGLE_EDIT
});

export const editChange = body => (
	{
		type: EDIT_CHANGE,
		payload: {
			body
		}
	}
)
