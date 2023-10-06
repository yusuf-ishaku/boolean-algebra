import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";


const initialState = [
    {
        id: "1", 
        title: "First Post", 
        content: "Hello",
        date: sub(new Date(), {minutes: 10}).toISOString(),
        reactions: {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0}
    },
    {
        id: "2", 
        title: "Second Post", 
        content: "Other text",
        date: sub(new Date(), {minutes: 10}).toISOString(),
        reactions: {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0}
    },
]

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action){
                // console.log(action.payload)
                state.push(action.payload);
            },
            prepare({title, content, userId}){
                return{
                    payload: {
                        id: nanoid(),
                        date: new Date().toISOString(),
                        user: userId,
                        content: content,
                        title: title,
                        reactions: {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0}
                    }
                }
            }
        },
        reactionAdded(state, action){
            const {postId, reaction} = action.payload;
            const existingPost =  state.find(post => post.id === postId);
            if(existingPost){
                existingPost.reactions[reaction]++
            }
        },

        postUpdated(state, action){
            const {id, title, content} = action.payload;
            const existingPost = state.find(post => post.id === id);
            if(existingPost){
                existingPost[title] = title;
                existingPost[content] = content;
            }
        }
    },
});

export const { postAdded, postUpdated, reactionAdded } = postSlice.actions;

export default postSlice.reducer;