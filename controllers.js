const axios = require("axios");
const { generateConfig } = require("./utils");
const nodemailer = require("nodemailer");
const CONSTANTS = require("./constants");
const { google } = require("googleapis");

require("dotenv").config();

// const oAuth2Client = new google.auth.OAuth2(
//   process.env.CLIENT_ID,
//   process.env.CLIENT_SECRET,
//   process.env.REDIRECT_URL
// );

// oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

async function sendMail(req, res) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        ...CONSTANTS.auth,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      ...CONSTANTS.mailoptions,
      text: "The Gmail API with NodeJS works Using different users",
    };

    const result = await transport.sendMail(mailOptions);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
}

async function getUser(req, res) {
  try {
    const url = `https://gmail.googleapis.com/gmail/v1/users/${req.params.email}/profile`;
    const { token } = await oAuth2Client.getAccessToken();
    console.log("===========================");
    console.log("token", token);
    console.log("===========================");
    const config = generateConfig(url, token);
    const response = await axios(config);
    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
}

async function getDrafts(req, res) {
  try {
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function readMail(req, res) {
  try {
  } catch (error) {
    res.send(error);
  }
}

async function searchMail(req, res) {
  try {
  } catch (error) {
    res.send(error);
  }
}

async function getAuth(req, res) {
  try {
    const { code, scope } = req.query;
    console.log("code", code);
    const clientId = process.env.CLIENT_ID;
    const redirectUri = process.env.REDIRECT_URI;
    const clientSecret = process.env.CLIENT_SECRET;
    const response = await axios.post(
      "https://www.googleapis.com/oauth2/v4/token",
      {
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }
    );

    // Return the refresh token
    console.log("response", response.data);
    // res.send("Great I got the data");
    return response.data.access_token;
  } catch (e) {
    console.log("error", e);
  }
}
async function login(req, res) {
  try {
    const clientId = process.env.CLIENT_ID;
    const redirectUri = process.env.REDIRECT_URI;
    const scopes = "https://www.googleapis.com/auth/gmail.readonly";

    // Build the authorization URL
    const authUrl =
      "https://accounts.google.com/o/oauth2/auth?" +
      "client_id=" +
      clientId +
      "&redirect_uri=" +
      redirectUri +
      "&response_type=code" +
      "&scope=" +
      scopes;

    // Redirect the user to the authorization URL
    res.redirect(authUrl);
  } catch (error) {
    res.send(error);
  }
}

module.exports = {
  getUser,
  sendMail,
  getDrafts,
  searchMail,
  readMail,
  login,
  getAuth,
};
