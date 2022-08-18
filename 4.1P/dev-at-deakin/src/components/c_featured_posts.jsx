import React from "react";
import "../CSS/s_featured_posts.css";
import PostPreview from "./c_posts_preview";


const FeaturedPosts = (props) => {
  const [posts,setPost] = React.useState([{}])
  React.useEffect(()=>{
    fetch(props.posts).then((res)=>res.json()).then((data)=>{
      setPost(data)
     })
     
  },[])

  const type = props.type;
  const title = props.title;
  let shuffled = posts.sort(() => 0.5 - Math.random()).slice(0,3);

  return (
    <div>
      <h1>{title}</h1>

      <ul className="postList">
        {
        shuffled.map((Post) => {
          return <PostPreview post={Post} />;
        })}
      </ul>

      <button value={type}>See all {type}</button>
    </div>
  );
};

export default FeaturedPosts;
