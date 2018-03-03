// @flow
import { getAllPosts, getPostBy, postDoc } from "../../../utils/api";
export const FETCH_LIST = "FETCH_LIST";
export const RECEIVE_LIST = "RECEIVE_LIST";
export const SORT_LIST = "SORT_LIST";
export const SHOW_DETAIL = "SHOW_DETAIL";
export const POST_READABLE = 'POST_READABLE';
export const POST_READABLE_END = 'POST_READABLE_END';
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

const postReadable = () => ({
    type: POST_READABLE
});

const postReadableEnd = readable => ({
    type: POST_READABLE_END,
    payload: {
        readable
    }
});

export const publicReadable = readable => (dispatch, getState) => {
    dispatch(postReadable());
    return postDoc(readable).then(postReadable => {
        dispatch(postReadableEnd({
            ...postReadable,
            date: new Date(postReadable.timestamp).Format("yyyy-MM-dd")
        }));
    })
}
