import {createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../api/client";

const initialState = [
    
];

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {

    },
    extraReducers(builder){
        builder.addCase(fetchUsers.fulfilled, (state, action) =>{
            return action.payload
        })
    }
});

export default userSlice.reducer;

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () =>{
    const response = await client.get('fakeApi/users');
    return response.data;
})