import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PostAuthor } from "./PostAuthor";
import { TimeAgo } from "./TimeAgo";
import { ReactionButtons } from "./ReactionButtons";

export const SinglePostPage = ({match}) =>{
    const {postId} = match.params;
    console.log(typeof postId); 
    const post = useSelector(state => 
        state.posts.find(post => post.id === postId)
    );
    
    console.log(post);
    
    if(!post){
        return <section><h2>Post not found</h2></section>
    }
    return(
        <section>
            <article className="post">
                <h2>{post.title}</h2>
                <PostAuthor userId={post.user} />
                <TimeAgo timestamp={post.date}></TimeAgo> 
                <ReactionButtons post ={post}></ReactionButtons>
                <p className="post-content">
                    {post.content}
                </p>
                <Link to={`/editPost/${post.id}`} className="button">
          Edit Post
        </Link>
            </article>
        </section>
    )
}
