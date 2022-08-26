import React from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/s_search_header.css";
// import { Link } from "react-router-dom";

const HeadBar = (props) => {
  const options = props.options;
  const navigate = useNavigate();

  return (
    <div className="headerBackground">
      <h1>DEV@Deakin</h1>
      <div className="searchContainer">
        <input type="text" className="searchBar" placeholder="Search" />
        <ul className="searchSuggestions">
          {() => {if(options.length > 0)options.map((option,index) => {
            return (
              <button key={index} type="button" className="searchResult">
                {option}
              </button>
            );
          })}}
        </ul>
      </div>
      <div className="headerButtonDiv">
        <button className="headerButton" value="Post" onClick={() => navigate('/makepost')}>
          Post
        </button>
        <button className="headerButton" value="Login">
          Login
        </button>
      </div>
    </div>
  );
};

export default HeadBar;
