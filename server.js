const express=require('express')
const app=express()
const router=require('./routs/userrouter')
const {errorHandler} =require('./middleware/errormiddleWare')
const actionrouter=require('./routs/actionsroutes')
const connectDB = require('./config/db');
const cors=require('cors')
const path=require('path')
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:false}))
const dotenv=require('dotenv').config()
const Port=process.env.PORT ||5000
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler)

app.use('/',router)
app.use('/',actionrouter)
// Serve frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));
     console.log("heyy", app.use(express.static(path.join(__dirname, '../frontend/build'))))
    app.get('*', (req, res) =>
      res.sendFile(
        path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
      )
    );
  } else {
    app.get('/', (req, res) => res.send('Please set to production'));
  }
  
// app.use(cors({
//     origin: 'http://localhost:3000'
// }));

app.listen(Port,()=>console.log(`server is runnig @ ${Port}`))