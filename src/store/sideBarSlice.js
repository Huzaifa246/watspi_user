import { createSlice } from "@reduxjs/toolkit";

const sideBarSlice = createSlice({
    name: "sideBar",
    initialState: { 
        sideBarState: {} 
    },
    reducers: {
        setsideBarState: (state, action) => {
            state.sideBarState = action.payload;
        }
    }
});

export const { setSideBarState } = sideBarSlice.actions;
export const sideBarReducer =  sideBarSlice.reducer;
