import { FETCH_LIST, RECEIVE_LIST, SORT_LIST, SHOW_DETAIL } from "./actions";
import { FETCH_CATEGORIES, RECEIVE_CATEGORIES } from "./filter/actions";

const initialState = {
    categorie: null,
    categories: [],
    list: [],
    fetchingData: false,
    sortby: "vote",
    showId: null
};
export function homePage(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case FETCH_CATEGORIES:
            return {
                ...state,
                fetchingData: true
            };
        case RECEIVE_CATEGORIES:
            return {
                ...state,
                categories: payload.categories
            };
        case FETCH_LIST:
            return {
                ...state,
                categorie: payload.categorie,
                fetchingData: true
            };
        case RECEIVE_LIST:
            return {
                ...state,
                list: payload.list,
                fetchingData: false
            };
        case SORT_LIST:
            return {
                ...state,
                sortby: payload.sortby
            };
        case SHOW_DETAIL:
            return {
                ...state,
                showId: payload.showId
            };
        default:
            return state;
    }
}
