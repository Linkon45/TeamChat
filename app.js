const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
const colors = require("colors");
const path = require("path");
const cookieParser = require("cookie-parser");
const {
  notFoundHandler,
  errorHandler,
} = require("./middleware/common/errorHandler");
const app = express();
const port = process.env.PORT || 8000;

connectDB();

//request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//set view engine
app.set("view engine", "ejs");

//set static assets
app.use(express.static(path.join(__dirname, "public")));

//parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

//routes
app.use("/", require("./routes/loginRoutes"));
app.use("/users", require("./routes/usersRoutes"));
app.use("/inbox", require("./routes/inboxRoutes"));

//error handlers
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
