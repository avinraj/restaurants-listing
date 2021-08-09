import {configureStore} from "@reduxjs/toolkit";
import restaurantReducer from "./restaurantSlice";
export default configureStore({
    reducer:{
        restaurants: restaurantReducer
    }
})