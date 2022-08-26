import React from "react";
import "../CSS/App.css";

// for default search options
import { faker } from "@faker-js/faker";

import "../components/c_email_form.jsx";
// import EmailForm from "../components/c_email_form.jsx";
// import CoverImage from "../components/c_cover_image";
// import FeaturedPosts from "../components/c_featured_posts";
// import Footer from "../components/c_footer";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Frame from "../pages/Frame";
import Home from "../pages/Home";
// import Blogs from "../pages/Blogs";
// import Contact from "../pages/Contact";
import NoPage from "../pages/NoPage";

const App = () => {
  const [data, setData] = React.useState(null);
  const [articles, setArticles] = React.useState([{}]);
  const [tutorials, setTutorials] = React.useState([{}]);
  // random default search words
  const defaultSearchOptions = [];

  for (let i = 0; i < 10; i++) {
    defaultSearchOptions.push(`${faker.word.noun()} ${faker.word.noun()}`);
  }

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
      })
      .then((data) => {});
  }, []);

  GetArticles();
  GetTutorials();

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Frame options={defaultSearchOptions} />}
          >
            <Route
              index
              element={<Home articles={articles} tutorials={tutorials} />}
            />
            {/* <Route path="blogs" element={<Blogs />} />
            <Route path="contact" element={<Contact />} /> */}
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
