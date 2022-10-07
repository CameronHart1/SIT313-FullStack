import React, { useContext, useState } from "react";
import "../CSS/p_make_post.css";
import { db, uploadArticle, uploadQuestion } from "../utils/firebase";
import { UserContext } from "../context/user.context";
import { PostContext } from "../context/posts.context";
// add image uplaod

const MakePost = () => {
  const [content, setContent] = useState({
    title: "",
    abstract: "",
    content: "",
    img: {},
    tags: [],
  });
  const [article, setArticle] = useState(true);
  const { currentUser } = useContext(UserContext);
  const { setCurrentPosts, currentPosts } = useContext(PostContext);

  // for switching between layouts
  const isArticle = (e) => setArticle(e.target.value === "Article");

  // Changing Content data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContent((preValue) => {
      if (name == "tags")
        return {
          ...preValue,
          [name]: value.split(/(?:,| |#)+/).filter((s) => s),
        };
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  const handleImageChange = (e) => {
    const value = e.target.files[0];
    setContent((preValue) => {
      return {
        ...preValue,
        img: value,
      };
    });
  };

  // Posting
  const submitPost = async () => {
    if (article) {
      const imageRef = await uploadArticle(
        content.title,
        content.abstract,
        content.img,
        content.content,
        content.tags,
        currentUser ? currentUser.displayName : "Anon"
      );
      var tmp = currentPosts;
      tmp.articles[imageRef.ref.id] = { ...imageRef.obj };
      setCurrentPosts(currentPosts);
        return imageRef;
    }
    // --

    const imageRef = await uploadQuestion(
      content.title,
      content.content,
      content.tags,
      currentUser ? currentUser.displayName : "Anon"
    );
    var tmp = currentPosts
    tmp.questions[imageRef.ref.id] = { ...imageRef.obj };
    setCurrentPosts(currentPosts);
    return imageRef;
  };

  // Render -------------------------------------
  return (
    <div className="contentDiv">
      <div className="greyBox">
        <h4>New Post</h4>
      </div>
      {/* radio box */}
      <div>
        <label> Select Post Type: </label>
        <input
          type="radio"
          id="article"
          name="post_type"
          value="Article"
          onClick={isArticle}
          defaultChecked
        />
        <label htmlFor="article">Article</label>
        <input
          type="radio"
          id="question"
          name="post_type"
          value="Question"
          onClick={isArticle}
        />
        <label htmlFor="question">Question</label>
      </div>

      {/* Content 
       -----------------------------
    */}
      <div>
        <div className="greyBox">
          <h4>What do you want to ask or share?</h4>
        </div>
        {/* Title */}
        <TitleComp handleTextChange={handleChange} />
        {/* IMG */}
        {article && (
          <ImageComp
            handleImageChange={handleImageChange}
            default={content.image}
          />
        )}
        {/* Abstract, with conditional rendering*/}
        {article && (
          <LargeTextBox
            handleTextChange={handleChange}
            title={"Abstract"}
            name="abstract"
            placeHolder={"A short Description of your article"}
            text={content.abstract}
            wordLimit="250"
            Rows="5"
            Columns="50"
          />
        )}

        {/* Content box */}
        <LargeTextBox
          handleTextChange={handleChange}
          title={article ? "Article Text" : "Describe your problem"}
          placeHolder={"Minimum 30 characters"}
          wordLimit="500"
          Rows="20"
          name="content"
          Columns="100"
        />
        {/* Tags */}
        <TagComp handleTextChange={handleChange} />
        {/* ------------------------------
       Submit Button*/}
        <PostButton
          content={content}
          article={article}
          postFunction={submitPost}
        />
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------------
// could move these to their own component files, but no real point
// seperate functions so they don't lose their data

const TitleComp = (props) => {
  return (
    <div className="IdDiv">
      <label>Title </label>
      <input
        type="text"
        name="title"
        placeholder="A short, descriptive title"
        onChange={props.handleTextChange}
      />
    </div>
  );
};
// -----------------------------------------------------------------------------------
const ImageComp = (props) => {
  return (
    <div>
      <p>Add an image</p>
      <input
        type="file"
        defaultValue={props.default}
        accept="image/*"
        id="ImageInput"
        onChange={props.handleImageChange}
      />
    </div>
  );
};
// -----------------------------------------------------------------------------------
const LargeTextBox = (props) => {
  const { WordLimit, Rows, Col, title, name, placeHolder } = props;
  const startText = props.text ? props.text : "";
  return (
    <div>
      <p>{title}</p>
      <textarea
        type="text"
        id="TextInput"
        name={name}
        maxLength={WordLimit}
        rows={Rows}
        cols={Col}
        placeholder={placeHolder}
        onChange={props.handleTextChange}
        defaultValue={startText}
      />
    </div>
  );
};
// -----------------------------------------------------------------------------------
const TagComp = (props) => {
  return (
    <div className="IdDiv">
      <label>Tags</label>
      <input
        type="text"
        name="tags"
        placeholder='At least 3 tags, seperate with:" ",#'
        // using regex to split hashtags and filtertring out any empty values
        onChange={props.handleTextChange}
      />
    </div>
  );
};
// -----------------------------------------------------------------------------------
const PostButton = (props) => {
  const [error, setError] = useState([]);
  const content = props.content;
  const postFunction = props.postFunction;

  const errorCheck = () => {
    var errors = [];
    // checking they are above lengths / are needed
    if (content.title.length < 5)
      errors.push({
        error: "NO_TITLE",
        msg: "Title is too short. Minimum 5 characters",
      });
    if (props.article && content.abstract.length < 20)
      errors.push({
        error: "NO_ABSTR",
        msg: "Abstract is too short. Minimum 20 characters",
      });
    if (content.content.length < 30)
      errors.push({
        error: "NO_CONTENT",
        msg: "Content is too short. Minimum 30 charcaters",
      });
    if (content.tags.length < 3)
      errors.push({ error: "NO_TAGS", msg: "Not enough tags. Minimum 3 tags" });

    if (errors.length > 0) setError(errors);
    else {
      postFunction();
      setError([]);
    }
  };

  const errorText =
    error.length > 0
      ? error.map((errorText) => <p key={errorText.error}>{errorText.msg}</p>)
      : null;

  return (
    <div className="SubmitPostButton">
      <button onClick={errorCheck}>Post</button>
      {errorText}
    </div>
  );
};
// ----------------------------------------------------------------------------
export default MakePost;
