import express from "express";
import cookieParser from "cookie-parser"; // needed to parse long cookies string.
import cors from "cors";
import jwt, { JwtPayload } from "jsonwebtoken"; //payload is type for ts.
import path from "path";

const JWT_SECRET = "test123";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
})); // means, cookies will only be set on this site. 

app.post("/signin", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    // do db validations, fetch id of user from db
    const token = jwt.sign({
        id: 1
    }, JWT_SECRET);
    res.cookie("token", token); // it will put cookie in the set-cookies header.
    res.send("Logged in!");
});

app.get("/user", (req, res) => {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    // Get email of the user from the database
    res.send({
        userId: decoded.id
    })
});


app.post("/logout", (req, res) => {
    res.cookie("token", "");
    res.clearCookie("token"); //these both lines will remove cookies from browsers.
    res.json({
        message: "Logged out!"
    })
});


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../src/index.html")) // this is serving the html file from the port 3000.
// in this case, no cors and credentials trues is required, as BE and FE are on same origin.
})

app.listen(3000);