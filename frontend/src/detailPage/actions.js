import { getDocDetail, getComments, voteDoc } from '../utils/api';
export const FETCH_DETAIL = 'FETCH_DETAIL';
export const RECEIVE_DETAIL = 'RECEIVE_DETAIL';
export const FETCH_COMMENT = 'FETCH_COMMENT';
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
export const VOTE_READ = 'VOTE_READ';
export const VOTE_READ_END = 'VOTE_READ_END';
export const getDetail = id => (dispatch, getState) => {
	dispatch(fetchDetail());
	return getDocDetail(id)
		.then(readable => ({
			...readable,
			date: new Date(readable.timestamp).Format('yyyy-MM-dd')
		}))
		.then(readable =>
			dispatch(
				receiveDetail({
					readable
				})
			)
		);
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
		.then(comments =>
			comments.map(comment => ({
				...comment,
				date: new Date(comment.timestamp).Format('yyyy-MM-dd')
			}))
		)
		.then(comments =>
			dispatch(
				receiveComment({
					comments
				})
			)
		);
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

export const vote = (id: string, option: 'upVote' | 'downVote') => (
	dispatch,
	getState
) => {
	dispatch(voteRead());
    return voteDoc(id, option)
    .then(readable => ({
        ...readable,
        date: new Date(readable.timestamp).Format('yyyy-MM-dd')
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
