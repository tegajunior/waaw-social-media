const sendEmail = require("../misc/mailer");
const resetPasswordEmail = async (req, username, email, userId) => {
  const html = `
  Hello ${username},
  <br />
  <br />

 You requested to reset your password, if you never did, please ignore this mail.
  <br /><br />
  Please click the link below or copy and paste to any browser to verify your account.<br />
  <br />
  <a href="http://${req.headers.host}/auth/reset-password/${userId}">
    http://${req.headers.host}/auth/reset-password/${userId}
  </a>
  <br /><br />
  Kind regards,
  <br />
  <strong>Team WAAW SOCIAL</strong>
`;
  await sendEmail(
    "chidiebereuzomahumble@gmail.com",
    email,
    "Reset Your Password",
    html
  );
};
module.exports = resetPasswordEmail;
