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
            <a href="https://www.facebook.com/"><img width="50px" src={process.env.PUBLIC_URL +"/107175_circle_facebook_icon.png"}/></a>
            <a href="https://www.instagram.com/?hl=en"><img width="50px" src={process.env.PUBLIC_URL +"/107172_circle_instagram_icon.png"}/></a>
            <a href="https://twitter.com/?lang=en"><img width="50px" src={process.env.PUBLIC_URL +"/107170_circle_twitter_icon.png"}/></a>
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

      {/* attribution */}
      <div>
      <a href="https://www.flaticon.com/free-icons/star" title="star icons">Star icons created by Freepik - Flaticon</a>
      </div>
      
    </div>
  );
};

export default Footer;
