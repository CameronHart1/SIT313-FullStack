import React from "react";

import HeadBar from "../components/c_search_header.jsx";
import Footer from "../components/c_footer";

import "../CSS/p_frame.css";

import { Outlet } from "react-router-dom";
// import Layout from "./pages/Layout";
// import Home from "./pages/Home";
// import Blogs from "./pages/Blogs";
// import Contact from "./pages/Contact";
// import NoPage from "./pages/NoPage";

const Frame = (props) => {
  const defaultSearch = props.options;
  return (
    <div className="FrameDiv">
      <HeadBar options={defaultSearch}></HeadBar>
      <Outlet />
      <Footer />
    </div>
  );
};

export default Frame;
