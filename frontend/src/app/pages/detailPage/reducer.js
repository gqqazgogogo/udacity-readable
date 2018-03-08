import {
	FETCH_DETAIL,
	RECEIVE_DETAIL,
	FETCH_COMMENT,
	RECEIVE_COMMENT,
	VOTE_READ,
	VOTE_READ_END,
	VOTE_COMMENT,
	VOTE_COMMENT_END,
	SORT_COMMENTS,
	COMMENT_END,
	DELETE_COMMENT_END,
	TOGGLE_EDIT,
	EDIT_CHANGE,
	TOGGLE_COMMENT_EDIT,
	EDIT_COMMENT_CHANGE,
	GO_BACK
} from './actions';
import { SHOW_DETAIL } from '../homePage/actions';
import { sort } from '../../../utils/api';
const initialState = {
	showId: null,
	fetchingData: true,
	readable: null,
	comments: [],
	voting: false,
	touchCommentIndex: null,
	sortby: 'vote',
	editing: false
};
export function detailPage(state = initialState, action) {
	const { type, payload } = action;
	switch(type) {
		case SHOW_DETAIL:
			return { ...state,
				showId: payload.showId
			};
		case FETCH_DETAIL:
			return { ...state,
				fetchingData: true
			};
		case RECEIVE_DETAIL:
			return { ...state,
				readable: payload.readable
			};
		case FETCH_COMMENT:
			return { ...state,
				fetchingData: true
			};
		case RECEIVE_COMMENT:
			return { ...state,
				fetchingData: false,
				comments: sort(payload.comments, state.sortby)
			};
		case VOTE_READ:
			return { ...state,
				voting: true
			};
		case VOTE_READ_END:
			return { ...state,
				readable: payload.readable,
				voting: false
			};
		case VOTE_COMMENT:
			return { ...state,
				voting: true,
				touchCommentIndex: payload.touchCommentIndex
			}
		case VOTE_COMMENT_END:
			return { ...state,
				touchCommentIndex: null,
				voting: false,
				comments: state.comments.map((item, index) => {
					// const comment = {...item};
					if (index === state.touchCommentIndex) {
						item.voteScore = payload.comment.voteScore
					}
					return item;
				})
			};
		case SORT_COMMENTS:
			return { ...state,
				sortby: payload.sortby,
				comments: sort(state.comments, payload.sortby)
			}
		case COMMENT_END:
			return { ...state,
				comments: sort([...state.comments, payload.comment], state.sortby)
			}
			case DELETE_COMMENT_END:
			return {
				...state,
				comments: sort(state.comments.filter(comment => comment.id !== payload.id), state.sortby)
			}
		case TOGGLE_EDIT:
			return {
				...state,
				editing: !state.editing
			}
		case EDIT_CHANGE:
			return {
				...state,
				readable: {
					...state.readable,
					body: payload.body
				}
			}
		case TOGGLE_COMMENT_EDIT:
			return {
				...state,
				touchCommentIndex: payload.id
			}
		case EDIT_COMMENT_CHANGE:
			return {
				...state,
				comments: state.comments.map(item => item.id === payload.id ? { ...item, body: payload.body } : item)
			}
		case GO_BACK:
			return { ...initialState };
		default:
			return state;
	}
}
