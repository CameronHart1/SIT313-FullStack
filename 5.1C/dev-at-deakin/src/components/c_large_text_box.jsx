import React from "react";
import "../CSS/s_large_text_box.css";

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
      <h2>{title}</h2>
      <textarea
        type="text"
        id="TextInput"
        name="TextInput"
        maxLength={WordLimit}
        rows={Rows}
        cols={Col}
        placeholder={placeHolder}
        onChange={(e) => props.handleTextChange(e.target.value)}
        defaultValue={startText}/>
    </div>
  );
};

export default LargeTextBox;
