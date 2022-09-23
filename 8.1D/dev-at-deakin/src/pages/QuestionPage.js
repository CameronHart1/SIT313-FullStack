import React, { useContext, useState } from "react";
import { PostContext } from "../context/posts.context";
import moment from "moment";

import "../CSS/p_frame.css";

const QuestionPage = (props) => {
  const questionsList = useContext(PostContext).currentPosts.questions;
  const [filter, setFilter] = useState({
    tags: [],
    text: "",
    dateFilter: "none",
    date: new Date(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter((preValue) => {
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

  // one big filter function
  const keys = Object.keys(questionsList).filter((i) => {
    let qi = questionsList[i];
    const df = filter.dateFilter;
    const dd = moment(qi.date);
    const id = filter.date ? moment(filter.date) : null;
    console.log({ dd, id });
    const dateTest = () => {
      if (df != "none") {
        if (df == "After") return dd.isSameOrAfter(id, "day");
        if (df == "Before") return dd.isSameOrBefore(id, "day");
        if (df == "Equal") return dd.isSame(id, "day");
      }
      return true;
    };

    return `${qi.title} ${qi.content}`.includes(filter.text)
      ? filter.tags.length > 0
        ? qi.tags.sort().includes(...filter.tags.sort())
        : dateTest()
      : false;
  });

  return (
    <div>
      <p>search</p>
      <input
        type="text"
        name="text"
        placeholder="Search"
        onChange={handleChange}
      />
      <p>tags</p>
      <input
        type="text"
        name="tags"
        placeholder="tags"
        onChange={handleChange}
      />
      <p>Dates</p>
      <select id="dateDD" name="dateFilter" onChange={handleChange}>
        <option value="None">None</option>
        <option value="After">After</option>
        <option value="Before">Before</option>
        <option value="Same">Same day</option>
      </select>
      {filter.dateFilter != "None" && (
        <input
          type="date"
          name="date"
          placeholder={new Date()}
          onChange={handleChange}
        />
      )}
      <h1>Questions</h1>
      <div>
        {keys.map((q) => {
          return <QuestionView key={q} question={questionsList[q]} />;
        })}
      </div>
    </div>
  );
};

export default QuestionPage;

const QuestionView = (props) => {
  const [expanded, setExpanded] = useState(false);
  const { title, rate, author, content, tags, date } = props.question;

  const ToggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div onClick={ToggleExpand}>
      <h1>{title}</h1>
      {expanded && (
        <div>
          <p>
            Author: {author} Date: {moment(date).format("MMM Do YYYY")}
          </p>
          <p>{content}</p>
        </div>
      )}
      <p className="tags">tags: {tags.join(" ")}</p>
    </div>
  );
};