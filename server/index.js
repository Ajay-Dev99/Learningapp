const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const apiRouter = require("./Routes")
const cookieparser = require("cookie-parser")
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cookieparser())

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ['get', 'post', 'delete', 'put', 'option']

}))
mongoose.connect(process.env.MONGO_URL).then((res) => {
    console.log("Db connection successfull");
}).catch((err) => {
    console.log(err);

})


app.get("/", (req, res) => [
    res.json("Hello world")
])

app.use("/api", apiRouter)

app.listen(process.env.PORT, () => {
    console.log(`server starts on port ${process.env.PORT}`);

})


// jndbMDydZsHaKbHO

// ajaydev