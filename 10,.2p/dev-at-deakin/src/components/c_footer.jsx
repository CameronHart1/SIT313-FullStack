import React from "react";
import "../CSS/s_footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="FooterMain">
      {/* top links */}
      <div className="HorizontalFlex TopLinks">
        {/* navigation */}
        <div className="TopFlex">
          <h1>Explore</h1>
          <ul className="VerticleFlex">
          <Link to="/">Home</Link>
          <Link to="/posts/questions">Questions</Link>
          <Link to="/posts/Articles">Articles</Link>
          <Link to="/posts/Tutorials">Tutorials</Link>
          </ul>
        </div>
        {/* support pages */}
        <div className="TopFlex">
          <h1>Support</h1>
          <ul className="VerticleFlex">
             <Link to="/faq/">FAQ</Link>
             <Link to="/faq/help">Help</Link>
             <Link to="/about/contact">Contact Us</Link>
          </ul>
        </div>
        {/* socials */}
        <div className="TopFlex">
          <h1>Stay Connected</h1>
          <ul className="HorizontalFlex">
            <a href="https://www.facebook.com/"><img width="50px" src={process.env.PUBLIC_URL +"/107175_circle_facebook_icon.png"} alt="Facebook Logo"/></a>
            <a href="https://www.instagram.com/?hl=en"><img width="50px" src={process.env.PUBLIC_URL +"/107172_circle_instagram_icon.png"} alt="Instagram Logo"/></a>
            <a href="https://twitter.com/?lang=en"><img width="50px" src={process.env.PUBLIC_URL +"/107170_circle_twitter_icon.png"} alt="Twitter Logo"/></a>
          </ul>
        </div>
      </div>

      {/* bottom links */}
      <div className="BottomLinks">
        <h1>DEV@Deakin 2022</h1>
        <ul className="HorizontalFlex BottomFlex">
          <Link to="/about/priavcy-policy">Privacy Policy</Link>
          <Link to="/about/terms">Terms</Link>
          <Link to="/about/conduct-code">Code of Conduct</Link>
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
