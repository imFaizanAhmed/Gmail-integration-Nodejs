require("dotenv").config();

const auth = {
  type: "OAuth2",
  user: "faizan.ahmed@numumail.com",
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  refreshToken: process.env.REFRESH_TOKEN,
};

const mailoptions = {
  to: "imfaizanahmed6@gmail.com",
  from: "faizan.ahmed@numumail.com",
  subject: "Gmail API NodeJS",
};

module.exports = {
  auth,
  mailoptions,
};
