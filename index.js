const cors = require("cors");
const express = require("express");
const app = express();
// const multer = require("multer");
// const initRoutes = require('./file.routes/file-route')
const bodyParser = require('body-parser')
// const fileUpload  = require('express-fileupload')
const path = require('path');
const connectDb = require("./config/db");
// const Image = require('./models/file-schema')
// const fileRouter = require('./file.routes/file-route')
 const userRouter = require('./routes/Routes')
// const oldcarfileRouter = require('./user-routs/old-car-routes')


//global.__basedir = __dirname;



app.use(
    express.json()
)


app.use (cors())
require('./routes/index.cors')


connectDb()



global.appRoot = path.resolve(__dirname)


 app.use('/user', userRouter)
// app.use('/', oldcarfileRouter)



// initRoutes(app);


let port = 8080;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});