import {
	FETCH_DETAIL,
	RECEIVE_DETAIL,
	FETCH_COMMENT,
	RECEIVE_COMMENT,
	VOTE_READ,
	VOTE_READ_END
} from './actions';
import { SHOW_DETAIL } from '../homePage/actions';
const initialState = {
	showId: null,
	fetchingData: true,
	readable: null,
	comments: [],
	voting: false
};
export function detailPage(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case SHOW_DETAIL:
			return {
				...state,
				showId: payload.showId
			};
		case FETCH_DETAIL:
			return {
				...state,
				fetchingData: true
			};
		case RECEIVE_DETAIL:
			return {
				...state,
				readable: payload.readable
			};
		case FETCH_COMMENT:
			return {
				...state,
				fetchingData: true
			};
		case RECEIVE_COMMENT:
			return {
				...state,
				fetchingData: false,
				comments: payload.comments
			};
		case VOTE_READ:
			return {
				...state,
				voting: true
			};
		case VOTE_READ_END:
			return {
				...state,
				readable: payload.readable,
				voting: false
			};
		default:
			return state;
	}
}
