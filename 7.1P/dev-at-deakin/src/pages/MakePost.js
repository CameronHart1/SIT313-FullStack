import React, { useState } from "react";
import "../CSS/p_make_post.css";

const MakePost = () => {
  const [content, setContent] = useState(["", "", "", []]);
  const [article, setArticle] = useState(true);

  // for switching between layouts
  const isArticle = (e) => setArticle(e.target.value === "Article");

  // Changing Content data
  // ----------
  // for title
  const handleTitleChange = (newVal) =>
    setContent([newVal, content[1], content[2], content[3]]);
  // For storing abstract or content
  const handleContentChange = (newVal, index) =>
    setContent(
      index === 1
        ? [content[0], newVal, content[2], content[3]]
        : [content[0], content[1], newVal, content[3]]
    );
  // for tags
  const handleTagChange = (newVal) =>
    setContent([content[0], content[1], content[2], newVal]);
  // ----------

  // Posting
  const submitPost = () => {
    // just downloading content as JSON

    // turning data into JSON
    var jsonOBJ = article
      ? {
          title: content[0],
          abstract: content[1],
          content: content[2],
          tags: content[3],
        }
      : {
          title: content[0],
          content: content[2],
          tags: content[3],
        };

    // https://codesandbox.io/s/4t2xb?file=/src/App.js:1112-1382
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(jsonOBJ)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = `${article ? "Article" : "Question"}_Post.json`;
    link.click();
  };

  // Conditional rendering for abstract Box
  const abstractBox = article ? (
    <LargeTextBox
      handleTextChange={(val) => handleContentChange(val, 1)}
      title={"Abstract"}
      placeHolder={"A short Description of your article"}
      wordLimit="250"
      Rows="5"
      text={content[1]}
      Columns="50"
    />
  ) : null;

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

        <TitleComp handleTextChange={(val) => handleTitleChange(val)} />

        {/* Abstract, with conditional rendering*/}
        {abstractBox}

        {/* Content box */}
        <LargeTextBox
          handleTextChange={(val) => handleContentChange(val, 2)}
          title={article ? "Article Text" : "Describe your problem"}
          placeHolder={"Minimum 30 characters"}
          wordLimit="500"
          Rows="20"
          Columns="100"
        />

        {/* Tags */}
        <TagComp handleTextChange={(val) => handleTagChange(val)} />

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
        placeholder="A short, descriptive title"
        onChange={(e) => props.handleTextChange(e.target.value)}
      />
    </div>
  );
};
// -----------------------------------------------------------------------------------
const LargeTextBox = (props) => {
  const WordLimit = props.WordLimit;
  const Rows = props.Rows;
  const Col = props.Columns;
  const title = props.title;
  const placeHolder = props.placeHolder;
  const startText = props.text ? props.text : "";

  // const textChangedHandler = (event) => {

  // };

  return (
    <div>
      <p>{title}</p>
      <textarea
        type="text"
        id="TextInput"
        name="TextInput"
        maxLength={WordLimit}
        rows={Rows}
        cols={Col}
        placeholder={placeHolder}
        onChange={(e) => props.handleTextChange(e.target.value)}
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
        placeholder='At least 3 tags, seperate with:" ",#'
        // using regex to split hashtags and filtertring out any empty values
        onChange={(e) =>
          props.handleTextChange(
            e.target.value.split(/(?:,| |#)+/).filter((s) => s)
          )
        }
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
    if (content[0].length < 5)
      errors.push({
        error: "NO_TITLE",
        msg: "Title is too short. Minimum 5 characters",
      });
    if (props.article && content[1].length < 20)
      errors.push({
        error: "NO_ABSTR",
        msg: "Abstract is too short. Minimum 20 characters",
      });
    if (content[2].length < 30)
      errors.push({
        error: "NO_CONTENT",
        msg: "Content is too short. Minimum 30 charcaters",
      });
    if (content[3].length < 3)
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
// -----------------------------------------------------------------------------------
export default MakePost;
