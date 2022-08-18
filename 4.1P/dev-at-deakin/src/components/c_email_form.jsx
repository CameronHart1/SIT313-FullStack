import React from "react";
import { useState } from "react";
import "../CSS/s_email_form.css";

const EmailForm = (props) => {
  const [showText, setShowText] = useState(true);
  const onClick = () => setShowText(false);
  var SignUpText = "Sign up for daily Insider";
  var AfterText = "Thank you for signing up";

  const onSubmit = () => {
    onClick();
  };

  // const ShowForm = () => {
  //   if (!showText) {
  //     return (
       
  //     );
  //   }

  //   return null;
  // };

  return (
    <div id="FormClass">
      <p>{showText ?SignUpText:AfterText}</p>
      <iframe name="EmptyFrame" className="Hidden" />
      {
      showText ?  (<form
          action="/emailContact"
          target="EmptyFrame"
          method="POST"
          onSubmit={onSubmit}
        >
          <input name="email" type="email" placeholder="enter your email" />
          <button name="submit" type="submit">
            Subscribe
          </button>
        </form>)
        :
        null
        }
    </div>
  );
};

export default EmailForm;
