const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const cookieParser = require("cookie-parser");
const session = require("express-session");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const path = require('path');

app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:3003"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    key: "userId",
    secret: "subscribe",
    resave: false, 
    saveUninitialized: false,
    rolling: true,
    cookie: {
        express: 24 * 60 * 60 * 1000
    }
}));

app.use('/image', express.static(path.join(__dirname, '/public_html/', 'uploads')));
app.use('/api/', userRoutes);
app.use('/api/', postRoutes);
app.listen(3003, () => {
    console.log("listen on 3003")
});