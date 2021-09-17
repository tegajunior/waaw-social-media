const mongoose = require('mongoose');
module.exports = () => {
  mongoose
    .connect("mongodb://localhost/waaw-social-media")
    .then(() => console.log("Database connected"))
    .catch((error) => console.error("Database not connected", error.message));
}