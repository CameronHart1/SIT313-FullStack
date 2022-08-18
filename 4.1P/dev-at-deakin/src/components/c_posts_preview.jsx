import React from "react";
import "../CSS/s_post_preview.css";


const PostPreview = (props) => {
  const post = props.post
  return (
    <div className="post">
      <img src={post.image}/>
      <h1>{post.article_name}</h1>
      <p>{post.description}</p>
      <div>
        <label>{post.rating}</label>
        <label>{post.first_name} {post.last_name}</label>
      </div>
    </div>
  );
};

export default PostPreview;
