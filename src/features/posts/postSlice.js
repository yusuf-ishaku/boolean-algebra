import { createSlice, createAsyncThunk, createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import {client} from "../../api/client";
// import { sub } from "date-fns";

const postsAdapter = createEntityAdapter({
  sortComparer: (a,b) => b.date.localeCompare(a.date)
})

const initialState = postsAdapter.getInitialState({
    status: 'idle',
    error: null
})

export const addNewPost = createAsyncThunk('/posts/addNewPost', async initialPost =>{
    const response = await client.post('/fakeApi/posts', initialPost);
    return response.data
})

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
    
        reactionAdded(state, action){
            const {postId, reaction} = action.payload;
            const existingPost =  state.entities[postId];
            if(existingPost){
                existingPost.reactions[reaction]++
            }
        },

        postUpdated(state, action){
            const {id, title, content} = action.payload;
            const existingPost = state.entities[id];
            if(existingPost){
                existingPost[title] = title;
                existingPost[content] = content;
            }
        }
    },
    extraReducers(builder) {
        builder
          .addCase(fetchPosts.pending, (state, action) => {
            state.status = 'loading'
          })
          .addCase(fetchPosts.fulfilled, (state, action) => {
            state.status = 'succeeded'
            // Add any fetched posts to the array
            postsAdapter.upsertMany(state, action.payload);
          })
          .addCase(fetchPosts.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
          })
          .addCase(addNewPost.fulfilled,postsAdapter.addOne)
      }
});

export const { 
    postAdded,
    postUpdated, 
    reactionAdded 
  } = postSlice.actions;



export default postSlice.reducer;


export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds
  // Pass in a selector that returns the posts slice of state
} = postsAdapter.getSelectors(state => state.posts)

export const selectPostByUser = createSelector(
  [selectAllPosts, (state, userId)=> userId],
  (posts, userId) => posts.filter(post => post.user === userId)
)

export const fetchPosts = createAsyncThunk("/posts/fetchPosts", async () =>{
   const response = await client.get("/fakeApi/posts");
   return response.data;
});

