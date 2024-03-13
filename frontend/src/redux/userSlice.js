import { createAction, createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     email : "",
//     firstname : "", 
//     image : "",
//     lastname : "",
//     _id : "",

// };

// const initialState = {
//     user:{}
// }

// const userSlice = createSlice({
//     name:"user",
//     initialState : {},
//     reducers:{
//         loginRedux:(state, action)=>{
//             return (state = action.payload)
//         },
//     }
// })


// export const userSlice = createSlice({
//     name : "user",
//     initialState,
//     reducers:{
//         loginRedux: (state, action)=>{
//             console.log(action.payload.data)
//             // state.user = action.payload.data
//             state._id = action.payload.data._id
//             state.firstname = action.payload.data.firstname
//             state.lastname = action.payload.data.lastname
//             state.email = action.payload.data.email
//             state.image = action.payload.data.image
//         }
//     }
// })

// const initialState ={};

// export const userSlice = createSlice({
//     name:"user",
//     initialState:{},
//     reducers:{
//         loginRedux(state, action){
//             return (state=action.payload)
//         }
//     }
// })

const initialState = {
    user:{}
}

export const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        loginRedux : (state, action)=>{
            // console.log(action.payload.data);
            state.user = action.payload.data
        },
        // logoutRedux : (state, action)=>{
        //     state.email : "",
        //     state.firstname : "", 
        //     state.image : "",
        //     state.lastname : "",
        //     state._id : "",
        // }
    }
})

export const { loginRedux }  = userSlice.actions

export default userSlice.reducer