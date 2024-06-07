const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config();
const bodyParser = require('body-parser');
const cors = require("cors")
const useSendMailRouter = require("./routes/sendMail")
// const userRoute = require("./routes/user")
// const authRoute = require("./routes/auth")
const productRoute = require("./routes/product")
const paystackRoute = require("./routes/paystackApi")
// const cartRoute = require("./routes/cart")
// const orderRoute = require("./routes/order")
// const stripeRoute = require("./routes/stripe")





mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
});

app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(useSendMailRouter)
// app.use("/api/auth", authRoute);
// app.use("/api/users", userRoute);
app.use(paystackRoute)
app.use("/api/products", productRoute);
// app.use("/api/carts", cartRoute);
// app.use("/api/orders", orderRoute);

app.get("/api/test", (req, res) => {
    console.log("test is good to go");
})



app.post("/posting/", (req, res) => {
    const username = req.body.username
    console.log(username);
    res.json("good testing")
})


app.listen(5000, () => {console.log("server connected");})
