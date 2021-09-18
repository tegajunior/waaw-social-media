const sendEmail = require("../misc/mailer");
const verifyUserEmail = async(req, username, email, secretToken) => {
    const html = `
  Hello ${username},
  <br />
  <br />

  Thank you for signing up at WAAW SOCIAL.
  <br /><br />
  Please click the link below or copy and paste to any browser to verify your account.<br />
  <br />
  <a href="http://${req.headers.host}/auth/verify-account/${secretToken}">
    http://${req.headers.host}/auth/verify-account/${secretToken}
  </a>
  <br />
  <br />
  Alternatively,
  Copy your verification token ${secretToken} then goto <a href="http://${req.headers.host}/auth/verify-account/">
  http://${req.headers.host}/auth/verify-account/</a>.  Paste the token and verify your account.
  <br /><br />
  Kind regards,
  <br />
  <strong>Team WAAW SOCIAL</strong>
`;
    await sendEmail(
        "chidiebereuzomahumble@gmail.com",
        email,
        "Please Verify Your Email",
        html
    );
};
module.exports = verifyUserEmail;