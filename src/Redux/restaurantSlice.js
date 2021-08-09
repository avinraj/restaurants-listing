import {createSlice} from "@reduxjs/toolkit";
import obj from "../Data/data";
export const restaurantSlice = createSlice({
    name:"restaurants",
    initialState:{
        value:obj
    }
})
export default restaurantSlice.reducer