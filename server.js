const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const db = require("./config/keys").mongoURI;
const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
const passport = require("passport");
const users = require("./routes/api/users");

const app = express();


//Bodyparser middleware
app.use(
    bodyParser.urlencoded({
        extended:false
    })
);

app.use(bodyParser.json);
//app.use(passport.initialize());

// Connect to MongoDB
//mongoose.Promise = global.Promise;
mongoose
    .connect(
        db,
        { useNewUrlParser: true }
    )
    .then(() => console.log("MongoDB successfully connected"))
.catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());


// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);

app.listen(port, () => console.log(`Server up and running on port...... ${port} !`));