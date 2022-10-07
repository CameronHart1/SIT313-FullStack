const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");


dotenv.config();
const PORT = process.env.PORT || 3001;
const app = express();

app.use(bodyParser.urlencoded({extended:true}))


const client = require("@sendgrid/client");

client.setApiKey(process.env.SENDGRID_API_KEY);

app.post("/emailContact", (req, res) => {
  console.log(req.body);
  console.log("Posting");

  var request = {
    url: `/v3/marketing/contacts`,
    method: "PUT",
    body: {
        "list_ids" : [ '80ab6b12-a608-4618-a0e4-c166d48a6556' ],
        "contacts": [
            {
              "email": req.body.email
            }
          ]
    }
  };

  client
    .request(request)
    .then(([response, body]) => {
      console.log(response.statusCode);
      console.log(response.body);
    })
    .catch((error) => {
      console.error(error);
    });

    res.end();
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
