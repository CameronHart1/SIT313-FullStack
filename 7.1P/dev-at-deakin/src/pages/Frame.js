import React from "react";

import HeadBar from "../components/c_search_header.jsx";

import Footer from "../components/c_footer";

import { Outlet } from "react-router-dom";
// import Layout from "./pages/Layout";
// import Home from "./pages/Home";
// import Blogs from "./pages/Blogs";
// import Contact from "./pages/Contact";
// import NoPage from "./pages/NoPage";

const Frame = (props) => {
  const defaultSearch = props.options;
  return (
    <div>
      <HeadBar options={defaultSearch}></HeadBar>
      <Outlet />
      <Footer />
    </div>
  );
};

export default Frame;
