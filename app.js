const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');
const connectDB =  require('./config/mongoose.config');
const ownersRouter = require('./routes/ownersRouter')
const usersRouter = require('./routes/usersRouter')
const productsRouter = require('./routes/productsRouter')


require('dotenv').config(); 
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,"public")));
app.use(cookieParser());
app.set("view engine","ejs");


// Routes
app.use("/owners",ownersRouter);
app.use("/users",usersRouter);
app.use("/products",productsRouter);

app.get('/',(req, res) => {
  res.send('its working');
});



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


