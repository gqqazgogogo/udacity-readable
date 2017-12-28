// @flow
import { getAllPosts, getPostBy } from "../utils/api";
export const FETCH_LIST = "FETCH_LIST";
export const RECEIVE_LIST = "RECEIVE_LIST";
export const SORT_LIST = "SORT_LIST";
export const SHOW_DETAIL = "SHOW_DETAIL";
export const requestList = categorie => (dispatch, getState) => {
    dispatch(fetchList({ categorie }));
    return categorie === "all"
        ? getAllPosts()
              .then(list =>
                  list.map(readable => ({
                      ...readable,
                      date: new Date(readable.timestamp).Format("yyyy-MM-dd")
                  }))
              )
              .then(list => dispatch(receiveList({ list })))
        : getPostBy(categorie)
              .then(list =>
                  list.map(readable => ({
                      ...readable,
                      date: new Date(readable.timestamp).Format("yyyy-MM-dd")
                  }))
              )
              .then(list => dispatch(receiveList({ list })));
};
const fetchList = ({ categorie }) => ({
    type: FETCH_LIST,
    payload: {
        categorie
    }
});
const receiveList = ({ list }) => ({
    type: RECEIVE_LIST,
    payload: {
        list
    }
});
export const sortList = ({ sortby }) => ({
    type: SORT_LIST,
    payload: {
        sortby
    }
});
export const showDetail = ({ id }) => ({
    type: SHOW_DETAIL,
    payload: {
        showId: id
    }
});
