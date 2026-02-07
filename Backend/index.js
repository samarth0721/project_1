const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");   // 👈 add this

require("dotenv").config();

const PORT = process.env.PORT || 3000;
const cors = require('cors');
app.use(cors({ origin: "*" ,
  credentials:true
})); // Your frontend port

app.use(express.json());
app.use(cookieParser());

const userRoutes = require('./routes/user');
app.use('/api/v1/user', userRoutes);

// const passport = require('./middleware/passport');
// app.use(passport.initialize());
// app.use(passport.session()); // Optional for sessions

app.use(
  fileUpload({
    useTempFiles: true,     
    tempFileDir: "/tmp/",    
  })
);

require("./config/database").connect();
require("./config/cloudinary").connect();

const user = require("./routes/user");
app.use("/api/v1", user);

app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
});
