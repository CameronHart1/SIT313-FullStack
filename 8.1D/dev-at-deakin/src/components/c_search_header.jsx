import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "../CSS/s_search_header.css";
// import { Link } from "react-router-dom";

const HeadBar = (props) => {
  const options = props.options;
  const navigate = useNavigate();

  const list =
    options
      ? options.map((option, index) => (
          <button key={index} type="button" className="searchResult">
            {option}
          </button>
        ))
      : null;

  return (
    <div className="headerBackground">
    <Link id="DevTitle" to="/">DEV@DEAKIN</Link>
      <div className="searchContainer">
        <input type="text" className="searchBar" placeholder="Search" />
        <ul className="searchSuggestions">{list}</ul>
      </div>
      <div className="headerButtonDiv">
        <button
          className="headerButton"
          value="Post"
          onClick={() => navigate("/makepost")}
        >
          Post
        </button>
        <Link id="LoginButton" to="/login/sign-in">
        <button className="headerButton" value="Login">
          Login
        </button>
        </Link>
      </div>
    </div>
  );
};

export default HeadBar;
