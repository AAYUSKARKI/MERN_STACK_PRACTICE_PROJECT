import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    jobs:[],
    loading:false,
    error:null
}

const jobslice = createSlice({
    name:'job',
    initialState,
    reducers:{
      setjobs:(state,action)=>{
        state.jobs = action.payload
      },
      setloading:(state,action)=>{
        state.loading=action.payload
      },
      seterror:(state,action)=>{
        state.error = action.payload
      }
}
})

export const {setjobs,setloading,seterror} = jobslice.actions

export default jobslice.reducer