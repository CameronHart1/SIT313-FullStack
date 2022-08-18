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

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      <HeadBar options={defaultSearchOptions}></HeadBar>
      <CoverImage/>
      <FeaturedPosts title="Featured Articles" posts="./articles.json" type="articles" route="placeholder" />
      <FeaturedPosts title="Featured Tutorials" posts="./tutorials.json" type="tutorials" route="placeholder"/>
      <EmailForm/>
      <Footer/>
    </div>
  );
}

export default App;
