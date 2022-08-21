import {createSlice} from "@reduxjs/toolkit";
const initialState = {
    coordinate: [51.505, -0.09]
}
export const naviSlice = createSlice({
    name:"coord",
    initialState,
    reducers:{
        update: (state, action) => {
            state.coordinate = action.payload
        }
    }
})
export const {update} = naviSlice.actions;
export default naviSlice.reducer;