import React, { useEffect } from "react";
import "../CSS/App.css";

// Routing stuff
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Frame from "../pages/Frame";
import Home from "../pages/Home";
import NoPage from "../pages/NoPage";
import MakePost from "../pages/MakePost";
import LoginPage from "../pages/Login";
import QuestionPage from "../pages/QuestionPage";

const App = () => {
  // const [, setData] = React.useState(null);
  const [articles, setArticles] = React.useState([{}]);
  const [tutorials, setTutorials] = React.useState([{}]);

  useEffect(() => {
    // fetch("/api")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setData(data.message);
    //   })
    //   .then((data) => {});
    // getting JSONs
    fetch("/articles.json")
      .then((res) => res.json())
      .then((Jdata) => {
        setArticles(Jdata);
        // console.log("Parsed Articles");
      });
    fetch("/tutorials.json")
      .then((res) => res.json())
      .then((Jdata) => {
        setTutorials(Jdata);
        // console.log("Parsed Tutorials");
      });
  }, []);

  // console.log(data);
  // getting 10 random names from all the articles
  const defaultSearchArray = (length) =>
    []
      .concat(
        articles.map((item) => item.article_name),
        tutorials.map((item) => item.article_name)
      )
      .sort(() => 0.5 - Math.random())
      .slice(0, length);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Frame options={defaultSearchArray(10)} />}>
            <Route
              index
              element={<Home articles={articles} tutorials={tutorials} />}
            />
            <Route path="/makepost" element={<MakePost />} />
            <Route path="/login/:SignType" element={<LoginPage />} />
            {/* <Route path="blogs" element={<Blogs />} />
            <Route path="contact" element={<Contact />} /> */}
            <Route path="/posts/questions" element={<QuestionPage/>}/>
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
