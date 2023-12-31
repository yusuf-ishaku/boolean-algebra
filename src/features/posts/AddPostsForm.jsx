import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { postAdded } from "./postSlice";
import { selectAllUsers } from "../users/usersSlice";
import { addNewPost } from "./postSlice";
// import { nanoid } from "@reduxjs/toolkit";


export const AddPostForm = () =>{
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [userId, setUserId] = useState(""); 
    const [addRequestStatus, setAddRequestStatus] = useState('idle')

    const onTitleChange = e => setTitle(e.target.value);
    const onContentChange = e => setContent(e.target.value);
    const onAuthorChange = e => setUserId(e.target.value);

    const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === 'idle'

    const dispatch = useDispatch();
    const users = useSelector(selectAllUsers)
    const savePostClicked = async () =>{
        if(canSave){
            try{
              setAddRequestStatus('pending');
              await dispatch(addNewPost({title, content, user: userId})).unwrap();
              setTitle('');
              setContent('');
              setUserId('');
            }
            catch (err){
              console.error('Failed to save the post: ', err)
            }finally{
              setAddRequestStatus('idle')
            }
        }
    }
    
   
    const usersOptions = users.map(user => (
        <option key={user.id} value={user.id}>
          {user.name}
        </option>
      ))
    
    return (
        <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChange}
        />
            <label htmlFor="postAuthor">Author:</label>
            <select id="postAuthor" value={userId} onChange={onAuthorChange}>
            <option value=""></option>
            {usersOptions}
            </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChange}
        />
        <button type="button" onClick={savePostClicked} disabled={!canSave}>Save Post</button>
      </form>
    </section>
    )
}