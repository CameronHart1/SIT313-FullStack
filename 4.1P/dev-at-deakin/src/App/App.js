import React from "react";
import "../CSS/App.css";

import {
  HeadBar,
  defaultSearchOptions,
} from "../components/c_search_header.jsx";

import "../components/c_email_form.jsx";
import EmailForm from "../components/c_email_form.jsx";
import CoverImage from "../components/c_cover_image";
import FeaturedPosts from "../components/c_featured_posts";
import Footer from "../components/c_footer";

function App() {
  const [data, setData] = React.useState(null);
  const [articles, setArticles] = React.useState([{}]);
  const [tutorials, setTutorials] = React.useState([{}]);

  // getting the JSON's
  const GetArticles = () => {
    React.useEffect(() => {
      fetch("./articles.json")
        .then((res) => res.json())
        .then((data) => {
          setArticles(data);
          console.log("Parsed Articles");
        });
    }, []);
  };

  const GetTutorials = () => {
    React.useEffect(() => {
      fetch("./tutorials.json")
        .then((res) => res.json())
        .then((data) => {
          setTutorials(data);
          console.log("Parsed Tutorials");
        });
    }, []);
  };

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => {
        setData(data.message);
      }).then((data) =>{
      });
  }, []);

  GetArticles();
  GetTutorials();
  
  return (
    <div className="App">
      <HeadBar options={defaultSearchOptions}></HeadBar>
      <CoverImage />
      <FeaturedPosts
        title="Featured Articles"
        posts={articles}
        type="articles"
        route="placeholder"
      />
      <FeaturedPosts
        title="Featured Tutorials"
        posts={tutorials}
        type="tutorials"
        route="placeholder"
      />
      <EmailForm />
      <Footer />
    </div>
  );
}

export default App;
