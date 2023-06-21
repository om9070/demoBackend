const dotenv=require("dotenv");
dotenv.config({
  path: ".env"
})
const express = require('express')
const app = express()
const bodyParser = require("body-parser");
var cors = require('cors')
const indexRoute=require("./routes/indexRoute")
const port = 4000
const sequelize=require("./util/database")





app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({
  origin: '*',
}));
app.use(bodyParser.json());


app.use("/",indexRoute)

//  sequelize
//      .sync({
//          alter: true,
//     })
//     .then((result) => {
//         console.log(result);
//      })
//     .catch((err) => {
//         console.log(err);
//     });



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
module.exports=app;