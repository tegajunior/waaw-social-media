//const path = require("path");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const logger = require("morgan");
module.exports = (app) => {
    app.use(cookieParser());
    app.use(flash());
    app.use(logger("dev"));

}