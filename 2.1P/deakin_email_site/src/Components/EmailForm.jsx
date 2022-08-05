import React from "react";
import '../css/EmailForm.css';
// function EmailForm(props) {
//   return (
//     <div style="display: flex">
//       <p style="padding-right: 20px">Sign up for our daily Insider</p>
//       <form action="/" method="POST">
//         <input name="InEmail" type="text" placeholder="example@email.com" />
//         <button name="SubmitEmail" type="submit">
//           Confirm Email
//         </button>
//       </form>
//     </div>
//   );
// }

// The auto Email Functionaility
// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);



//The getting email Form
class EmailForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    // const data = new FormData(event.target);

    // document.getElementById("FormClass).classList.toggle("show")
    // fetch('/api/form-submit-url', {
    //   method: 'POST',
    //   body: data,
    // });
  }

  render() {
    return (
      <div>
        <div>        
          <form onSubmit={this.handleSubmit}>
          <p>Sign up for our daily Insider</p>

          <input
            id="InEmail"
            name="InEmail"
            type="email"
            placeholder="example@email.com"
          />

          <button id="SubmitEmail" name="SubmitEmail" type="submit">Subscribe</button>
        </form>
        </div>
        <div id="FormClass">
        <iframe scrolling="no" src="https://cdn.forms-content.sg-form.com/1ba83100-148c-11ed-8737-9eec31e793d8"/>
        </div>
      </div>
              
    );
  }
}

export default EmailForm;
