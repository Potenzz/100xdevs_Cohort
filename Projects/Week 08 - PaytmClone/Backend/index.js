require('dotenv').config();
const express = require("express");
const mainRouter = require("./routes/index")
const cors = require('cors');
const helmet = require('helmet');



const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet())


app.use("/api/v1", mainRouter)





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
