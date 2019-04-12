var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

<<<<<<< HEAD
const passport = require("passport");
const session = require("express-session");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
// var sheltersRouter = require("./routes/shelters");
=======
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var shelterRouter = require("./routes/shelters");
>>>>>>> 1bb256f30c0ef14d2a4e0e6df84be67b3b4ae107
var postsRouter = require("./routes/posts");
var adoptedRouter = require("./routes/adopted");
var favoritedRouter = require("./routes/favorited");
var commentsRouter = require("./routes/comments");
<<<<<<< HEAD
=======
var petfinderRouter = require("./routes/petFinderAPIRoute.js");
>>>>>>> 1bb256f30c0ef14d2a4e0e6df84be67b3b4ae107

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  session({
    secret: "never gonna give u up",
    resave: false,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
<<<<<<< HEAD
=======
app.use("/petfinder", petfinderRouter);
>>>>>>> 1bb256f30c0ef14d2a4e0e6df84be67b3b4ae107
app.use("/users", usersRouter);
// app.use('/shelters', sheltersRouter);
app.use("/posts", postsRouter);
app.use("/adopted", adoptedRouter);
app.use("/favorited", favoritedRouter);
app.use("/comments", commentsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
