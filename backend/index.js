const express = require('express')
const app = express()
const cors = require("cors")

const mongoose = require('mongoose');

const port = process.env.PORT || 5000;
require('dotenv').config()

//middleware 
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173"],
  credentials:true//allow you to
}))

//routes 
const bookRoutes = require('./src/books/book.route')
const orderRoutes = require('./src/orders/order.route')
app.use("/api/books", bookRoutes)//API to get books
app.use("/api/orders", orderRoutes)//API to get books orders

async function main() {
  await mongoose.connect(process.env.DB_URL);
 
  app.use('/', (req, res) => {
  res.send('I know I can');// res means response and req request

});

}

main().then(() => console.log("Mongodb Connect Successfully")).catch(err => console.log(err));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
