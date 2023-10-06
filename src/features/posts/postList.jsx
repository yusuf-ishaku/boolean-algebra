// import { render } from "@testing-library/react";
import { useSelector } from "react-redux";
import {Link } from "react-router-dom";
import { PostAuthor } from "./PostAuthor";
import { ReactionButtons } from "./ReactionButtons";
export const PostList = () =>{
    const posts = useSelector(state => state.posts);
    const orderedPosts = posts.slice().sort((a,b) => b.date.localeCompare(a.date));
    // console.log(orderedPosts);
    const renderedPosts = orderedPosts.map(post => (
        <article className="post-excerpt" key={post.id}>
          <h3>{post.title}</h3>
          <p className="post-content">{post.content.substring(0, 100)}</p>
          <PostAuthor userId={post.user} />, 
          <ReactionButtons post ={post}></ReactionButtons>,
          <Link to={`/posts/${post.id}`} className="button muted-button">
            View Post
          </Link>
        </article>
    ));
    

    return (
        <section className="posts-list">
            {renderedPosts}
        </section>
    )
}