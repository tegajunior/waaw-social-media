const { globalVariables } = require("./config_1/configuration");
const express = require("express");
const path = require("path");
const passport = require("passport");


const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

require('./startup/db')();
require('./startup/sessionSetup')(app);
require('./startup/passportSetup')();

app.use(passport.initialize());
app.use(passport.session());

require("./startup/basicAppInit")(app);
app.use(globalVariables);

app.get("/", (req, res) => {
    res.render("index")
})
const PORT = 4000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));