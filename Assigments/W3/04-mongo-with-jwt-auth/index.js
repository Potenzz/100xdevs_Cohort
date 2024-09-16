const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const adminRouter = require("./routes/admin")
const userRouter = require("./routes/user");

// Middleware for parsing request bodies
app.use(bodyParser.json());
app.use("/admin", adminRouter)
app.use("/user", userRouter)

const PORT = 3000;

// 404 Error handler (for unmatched routes)
app.use((req, res, next) => {
    res.status(404).send("This url is not Found");
});
// Error handling middleware (for internal server errors)
app.use(function (err, req, res, next) {
    console.error(err.stack);   
    res.status(500).send("Internal Server Error!");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
