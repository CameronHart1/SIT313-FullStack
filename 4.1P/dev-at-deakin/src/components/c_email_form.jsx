import React from "react";
import { useState } from "react";
import "../CSS/s_email_form.css";

const EmailForm = (props) => {
  const [showText, setShowText] = useState(true);

  var SignUpText = "Sign up for daily Insider";
  var AfterText = "Thank you for signing up";

  const FormSubmit = () => {
    setShowText(false);
    // document.getElementById("EmailForm").submit();
  };

  return (
    <div id="FormClass">
      <p>{showText ? SignUpText : AfterText}</p>
      <iframe name="EmptyFrame" className="Hidden" />
        <form
          id="EmailForm"
          action="/emailContact"
          target="EmptyFrame"
          method="POST"
          onSubmit={FormSubmit}
          className = {showText? null : "Hidden"}
        >
          <input name="email" type="email" placeholder="enter your email" />
          <button name="submit" type="submit">
            Subscribe
          </button>
        </form>

    </div>
  );
};

export default EmailForm;
