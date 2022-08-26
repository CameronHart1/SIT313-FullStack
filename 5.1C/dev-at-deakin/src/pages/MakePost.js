import React, { useState } from "react";
import LargeTextBox from "../components/c_large_text_box";

const MakePost = () => {
  const [content, setContent] = useState(["", ""]);
  const [article, setArticle] = useState(true);

  // For storing vcontent and/or abstract
  const handleAbstractChange = (newVal) => {
    setContent([newVal, content[1]]);
  };
  const handleContentChange = (newVal, abstract) =>
    setContent(abstract ? [newVal, content[1]] : [content[0], newVal]);
  // for switching between layouts
  const isArticle = (e) => setArticle(e.target.value === "Article");

  // Conditional rendering for abstract Box
  // soesnt save data between switches 
  // would need to pass content[0] to box and set it as textbox text
  const abstractBox = article ? (
    <LargeTextBox
      handleTextChange={(val) => handleAbstractChange(val, true)}
      title={"abstract"}
      placeHolder={"A short Description of your article"}
      wordLimit="250"
      Rows="5"
      Columns="50"
    />
  ) : null;

  return (
    <div>
      {/* radio box */}
      <div>
        <p>Post Type</p>
        <input
          type="radio"
          id="article"
          name="post_type"
          value="Article"
          onClick={isArticle}
          defaultChecked
        />
        <label for="article">Article</label>
        <input
          type="radio"
          id="question"
          name="post_type"
          value="Question"
          onClick={isArticle}
        />
        <label for="question">Question</label>
      </div>
      {/* Abstract, with conditional rendering*/}
      {abstractBox}
      {/* Content box */}
      <LargeTextBox
        handleTextChange={(val) => handleContentChange(val, false)}
        title={article ? "Article Content" : "Question"}
        placeHolder={article ? "Article Content" : "Question"}
        wordLimit="500"
        Rows="20"
        Columns="100"
      />
    </div>
  );
};

export default MakePost;
