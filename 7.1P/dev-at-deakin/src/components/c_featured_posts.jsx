import React from "react";
import "../CSS/s_featured_posts.css";
import PostPreview from "./c_posts_preview";


const FeaturedPosts = (props) => {
  const type = props.type;
  const title = props.title;
  let shuffled = props.posts.sort(() => 0.5 - Math.random()).slice(0, 3);

  return (
    <div>
      <h1>{title}</h1>

      <div className="postList">
        {shuffled.map((Post) => {
          return <PostPreview key={title + Post.id} post={Post} />;
        })}
      </div>

      <button value={type}>See all {type}</button>
    </div>
  );
};

export default FeaturedPosts;
