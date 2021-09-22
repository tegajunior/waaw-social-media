const { globalVariables } = require("./config_1/configuration");
const express = require("express");
const path = require("path");
const passport = require("passport");
require('dotenv').config();

const defaultRoutes = require("./routes/default/default.routes");
const authRoutes = require("./routes/auth/auth.routes");
const userRoutes = require("./routes/user/user.routes");
const commentRoutes = require("./routes/comment/comment.routes");
const postRoutes = require("./routes/post/post.routes");
const likeRoutes = require("./routes/like/like.route")



const app = express();
app.locals.moment = require('moment');
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

require('./startup/db')();
require('./startup/sessionSetup')(app);
require('./startup/passportSetup')();
require('./startup/googleStrategy')();


app.use(passport.initialize());
app.use(passport.session());

require("./startup/basicAppInit")(app);
app.use(globalVariables);

app.get('/auth/testing', (req, res) => {
    res.render('auth/forgotpassword');
})

app.get(
    "/auth/google/waawsocial",
    passport.authenticate("google", { failureRedirect: "/auth/register" }),
    (req, res) => {
        res.redirect("/user/profile");
    }
);

app.use("/", defaultRoutes);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/comment", commentRoutes);
app.use("/post", postRoutes);
app.use("/like", likeRoutes);

app.use((req, res, next) => {
    res.send("Page not found!");
    next();
})

const PORT = 7000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));