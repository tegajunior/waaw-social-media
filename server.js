const { globalVariables } = require("./config_1/configuration");
const express = require("express");
const path = require("path");
const passport = require("passport");

const defaultRoutes = require("./routes/default/default.routes");
const authRoutes = require("./routes/auth/auth.routes");
const userRoutes = require("./routes/user/user.routes");
const commentRoutes = require("./routes/comment/comment.routes");
const postRoutes = require("./routes/post/post.routes");


const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

require('./startup/db')();
require('./startup/sessionSetup')(app);

app.use(passport.initialize());
app.use(passport.session());

require("./startup/basicAppInit")(app);
app.use(globalVariables);

app.use("/", defaultRoutes);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/comment", commentRoutes);
app.use("/post", postRoutes);

const PORT = 7000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));