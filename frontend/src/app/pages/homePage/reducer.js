import { FETCH_LIST, RECEIVE_LIST, SORT_LIST, SHOW_DETAIL, POST_READABLE, POST_READABLE_END, VOTE_READ, VOTE_READ_END, DELETE_READ_END } from "./actions";
import { FETCH_CATEGORIES, RECEIVE_CATEGORIES } from "./filter/actions";
import { sort } from '../../../utils/api';
const initialState = {
	categorie: null,
	categories: [],
	list: [],
	fetchingData: false,
	sortby: "vote",
	showId: null,
	postingReadable: false,
	voting: false,
	touchReadIndex: null
};
export function homePage(state = initialState, action) {
	const { type, payload } = action;
	switch(type) {
		case FETCH_CATEGORIES:
			return { ...state,
				fetchingData: true
			};
		case RECEIVE_CATEGORIES:
			return { ...state,
				categories: payload.categories
			};
		case FETCH_LIST:
			return { ...state,
				categorie: payload.categorie,
				fetchingData: true
			};
		case RECEIVE_LIST:
			return { ...state,
				list: sort(payload.list, state.sortby),
				fetchingData: false
			};
		case SORT_LIST:
			return { ...state,
				sortby: payload.sortby,
				list: sort(state.list, payload.sortby)
			};
		case SHOW_DETAIL:
			return { ...state,
				showId: payload.showId
			};
		case POST_READABLE:
			return { ...state,
				postingReadable: true
			}
		case POST_READABLE_END:
			return { ...state,
				postingReadable: false,
				list: sort(state.list.concat(payload.readable), state.sortby)
			}
		case VOTE_READ:
			return { ...state,
				voting: true
			};
		case VOTE_READ_END:
			return { ...state,
				list: state.list.map(item => item.id === payload.readable.id ? payload.readable : item),
				voting: false
			};
		case DELETE_READ_END:
			return {
				...state,
				list: state.list.filter(item => item.id !== payload.id)
			}
		default:
			return state;
	}
}
