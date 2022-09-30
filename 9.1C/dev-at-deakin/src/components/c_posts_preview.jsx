import React from "react";
import "../CSS/s_post_preview.css";

const PostPreview = (props) => {
  const post = props.post;
  return (
    <div className="post" >
      <img src={post.image} alt = "preview"/>
      <h1>{post.article_name}</h1>
      <p>{post.description}</p>
      <div>
        <div>
          <img
            width="20px"
            src={process.env.PUBLIC_URL + "/star.png"}
            alt = "Star"
          />
          <label>{post.rating}</label>
        </div>

        <label>
          {post.first_name} {post.last_name}
        </label>
      </div>
    </div>
  );
};

export default PostPreview;
