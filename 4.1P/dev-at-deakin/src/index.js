import React from 'react';
import ReactDOM from 'react-dom/client';
import './CSS/index.css';
import App from './App/App';
import reportWebVitals from './App/reportWebVitals';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// const client = require('@sendgrid/client');
// client.setApiKey(process.env.SENDGRID_API_KEY);

// const data = {
//   "contacts": [
//     {
//       "email": "ryan39@lee-young.com",
//       "custom_fields": {
//         "w1": "2002-10-02T15:00:00Z",
//         "w33": 9.5,
//         "e2": "Coffee is a beverage that puts one to sleep when not drank."
//       }
//     }
//   ]
// };

// const request = {
//   url: `/v3/marketing/contacts`,
//   method: 'PUT',
//   body: data
// }

// client.request(request)
//   .then(([response, body]) => {
//     console.log(response.statusCode);
//     console.log(response.body);
//   })
//   .catch(error => {
//     console.error(error);
//   });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
