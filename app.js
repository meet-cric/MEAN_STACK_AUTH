const express=require('express');
const path=require("path");
const bodyParser=require('body-parser');
const cors=require('cors');
const passport=require('passport');
const mongoose=require('mongoose');

const config=require('./config/database');

//connect to database
mongoose.connect(config.database);

//On connection
mongoose.connection.on('connected',()=>{
  console.log("connected to database"+config.database);
})

//On Error
mongoose.connection.on('error',(err)=>{
  console.log("Database error:"+err);
}); 

const app=express();

const users=require('./routes/users');
//port number
const port=process.env.PORT || 8080;

//cors middleware
app.use(cors());

//set static folder
app.use(express.static(path.join(__dirname,'public')))

//body parser middleware//
app.use(bodyParser.json());

//passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use('/users',users);


//INDEX route
app.get('/',(req,res)=>{
  res.send("invalid point");
});
app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'public/index.html'));
})

app.listen(port,()=>{
  console.log("server started on port "+port)
}) ;
