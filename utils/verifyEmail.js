const sendEmail = require("../misc/mailer");
const verifyUserEmail = async (req, username, email, secretToken) => {
  const html = `
  Hello ${username},
  <br />
  <br />

  Thank you for signing up at WAAWTube.
  <br /><br />
  Please click the link below or copy and paste to any browser to verufy your account.
  <br />
  <a href="http://${req.headers.host}/auth/verify-token/${secretToken}">
    http://${req.headers.host}/auth/verify-token/${secretToken}
  </a>

  <br /><br />
  Kind regards,
  <br />
  <strong>Team WAAWTube</strong>
`;
  await sendEmail(
    "chidiebereuzomahumble@gmail.com",
    email,
    "Please Verify Your Email",
    html
  );
};
module.exports = verifyUserEmail;
