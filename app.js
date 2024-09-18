const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');
const connectDB =  require('./config/mongoose.config');
const ownersRouter = require('./routes/ownersRouter')
const usersRouter = require('./routes/usersRouter')
const productsRouter = require('./routes/productsRouter')
const registerRouter = require('./routes/index');
const flash = require('connect-flash');
const expressSession = require('express-session');

require('dotenv').config(); 
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,"public")));
app.use(cookieParser());
app.set("view engine","ejs");
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET
  })
);
app.use(flash());

// Routes
app.use("/owners",ownersRouter);
app.use("/users",usersRouter);
app.use("/products",productsRouter);
app.use('/',registerRouter);




const startServer = async () => {
    try {
      await connectDB();
      app.on("error", (error) => {
        console.error("App error: ", error);
        throw error;
      });
  
      const port = process.env.PORT || 3000;
      app.listen(port, () => {
        console.log(`Server is running at port: ${port}`);
      });
    } catch (err) {
      console.error("MONGO DB connection failed:", err);
    }
};
  
startServer();


