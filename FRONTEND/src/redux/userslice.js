import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    authuser: null,
}

const userslice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setauthuser:(state,action)=>{
            state.authuser = action.payload
        },
    }
})

export const {setauthuser} = userslice.actions

export default userslice.reducer