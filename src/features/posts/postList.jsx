// import { render } from "@testing-library/react";
import { Spinner } from '../../components/Spinner'
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import {Link } from "react-router-dom";
import { PostAuthor } from "./PostAuthor";
import { ReactionButtons } from "./ReactionButtons";
import { selectPostById, selectPostIds, fetchPosts } from "./postSlice.js";


let PostExcerpt = ({postId}) => {
  const post = useSelector(state => selectPostById(state, postId))
  return (
    <article className="post-excerpt" key={post.id}>
    <h3>{post.title}</h3>
    <p className="post-content">{post.content.substring(0, 100)}</p>
    <PostAuthor userId={post.user} />, 
    <ReactionButtons post ={post}></ReactionButtons>,
    <Link to={`/posts/${post.id}`} className="button muted-button">
      View Post
    </Link>
  </article>
  )
}
// import {  } from "./postSlice.js";
export const PostList = () =>{
    const dispatch = useDispatch();
    const orderedPostIds = useSelector(selectPostIds);
    // const posts = useSelector(selectAllPosts);
    const postStatus =  useSelector(state => state.posts.status);
    const error = useSelector(state => state.posts.error);

    useEffect( () =>{
      if(postStatus === 'idle'){
        dispatch(fetchPosts());
      }
    }, [postStatus, dispatch]);
   
    let content = "";
    if (postStatus === "loading"){
      content = <Spinner text='loading...'></Spinner>
    }else if(postStatus === "succeeded"){
   
      content = orderedPostIds.map(postId =>  (
        <PostExcerpt key={postId} postId={postId}></PostExcerpt>
      ))
    }else if(postStatus === "failed"){
      content = <div>{error}</div>
    }

    return (
        <section className="posts-list">
          <h2>Posts</h2>
            {content}
        </section>
    )
}