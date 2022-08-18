import React from "react";
import { faker } from "@faker-js/faker";
import "../CSS/s_search_header.css";

const HeadBar = (props) => {
  const { options } = props;
  return (
    <div className="headerBackground">
      <h1>DEV@Deakin</h1>
      <div className="searchContainer">
        <input type="text" className="searchBar" placeholder="Search" />
        <ul className="searchSuggestions">
          {options.map((option) => {
            return (
              <button type="button" className="searchResult">
                {option}
              </button>
            );
          })}
        </ul>
      </div>
      <div className="headerButtonDiv">
        <button className="headerButton" value="Post">
          Post
        </button>
        <button className="headerButton" value="Login">
          Login
        </button>
      </div>
    </div>
  );
};

// random default search words
const defaultSearchOptions = [];
for (let i = 0; i < 10; i++) {
  defaultSearchOptions.push(`${faker.word.noun()} ${faker.word.noun()}`);
}

export default HeadBar;
export { HeadBar, defaultSearchOptions };
