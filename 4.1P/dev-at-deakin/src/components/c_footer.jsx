import React from "react";
import "../CSS/s_footer.css";

const Footer = () => {
  return (
    <div className="FooterMain">
      {/* top links */}
      <div className="HorizontalFlex TopLinks">
        {/* navigation */}
        <div className="TopFlex">
          <h1>Explore</h1>
          <ul className="VerticleFlex">
            <a>Home</a>
            <a>Questions</a>
            <a>Articles</a>
            <a>Tutorials</a>
          </ul>
        </div>
        {/* support pages */}
        <div className="TopFlex">
          <h1>Support</h1>
          <ul className="VerticleFlex">
            <a>FAQs</a>
            <a>Help</a>
            <a>Contact Us</a>
          </ul>
        </div>
        {/* socials */}
        <div className="TopFlex">
          <h1>Stay Connected</h1>
          <ul className="HorizontalFlex">
            <a>fb</a>
            <a>twitter</a>
            <a>insta</a>
          </ul>
        </div>
      </div>

      {/* bottom links */}
      <div className="BottomLinks">
        <h1>DEV@Deakin 2022</h1>
        <ul className="HorizontalFlex BottomFlex">
          <a>Privacy Policy</a>
          <a>Terms</a>
          <a>Code of Conduct</a>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
