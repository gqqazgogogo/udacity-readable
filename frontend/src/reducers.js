import { combineReducers } from "redux";
import { homePage } from "./app/pages/homePage/reducer";
import { detailPage } from "./app/pages/detailPage/reducer";

export default combineReducers({
    homePage,
    detailPage
});
