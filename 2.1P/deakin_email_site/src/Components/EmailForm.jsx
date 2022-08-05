import React from "react";

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

//The getting email Form
class EmailForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    fetch("/api/form-submit-url", {
      method: "POST",
      body: data,
    });
  }




  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <p>Sign up for our daily Insider</p>

          <input
            id="InEmail"
            name="InEmail"
            type="email"
            placeholder="example@email.com"
          />

          <button name="SubmitEmail" type="submit">Confirm Email</button>
        </form>
      </div>
    );
  }
}

export default EmailForm;
