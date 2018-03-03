// @flow
import { getCategories } from "../../../../utils/api";
export const FETCH_CATEGORIES = "FETCH_CATEGORIES";
export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES";
export const SORT_LIST = "SORT_LIST";
export const requestCategories = () => (dispatch, getState) => {
    dispatch(fetchCategories());
    return getCategories().then(categories =>
        dispatch(receiveCategories(categories))
    );
};
const fetchCategories = () => ({
    type: FETCH_CATEGORIES
});
const receiveCategories = categories => ({
    type: RECEIVE_CATEGORIES,
    payload: {
        categories: [{ name: "all", path: "all" }, ...categories]
    }
});
