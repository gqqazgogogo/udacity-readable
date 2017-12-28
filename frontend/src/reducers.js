import { combineReducers } from "redux";
import { homePage } from "./homePage/reducer";
import { detailPage } from "./detailPage/reducer";

export default combineReducers({
    homePage,
    detailPage
});
