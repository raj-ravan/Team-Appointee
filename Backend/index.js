const express =require ("express");
const mysql=require("mysql");
const cors =require("cors");
const app=express();

app.use(express.json());
// app.use(cors());
app.options('*',cors())
app.options((req, res, next) => {
    res.setHeader("Access-control-Allow-Origin", "*")
    res.setHeader("Access-control-Allow-Methods","*")
    res.setHeader("Access-control-Allow-Headers", "*")
    res.end()
});

app.use(cors({
    allowedHeaders:['authorization','content-type'],
    exposedHeaders:['authorization','content-type'],
    origin:'*',
    methods:['GET,HEAD,PUT,POST,PATCH,DELETE'],
    preflightContinue:false
}))

const db =mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "patient",

});

app.post("/appointment", (req,res) =>{
    const State=req.body.State;
    const District=req.body.District;
    const SubDistrict=req.body.SubDistrict;
    const Specialization=req.body.Specialization;
    const SelectHospital=req.body.SelectHospital;

      res.set('Access-Control-Allow-Origin','*')
      db.query(
        "INSERT INTO appointment (State,District,SubDistrict,Specialization,SelectHospital) VALUES (?,?,?,?,?)",
        [State,District,SubDistrict,Specialization,SelectHospital],
          (err,result) => {
              console.log(err);
          }
  
      );
  });

app.post("/register", (req,res) =>{

  const fullname=req.body.fullname;
  const verifiedNumber=req.body.verifiedNumber;
  const email=req.body.email;
  const password=req.body.password;
  res.set('Access-Control-Allow-Origin','*')
    db.query(
        "INSERT INTO users (fullname,verifiedNumber,email,password) VALUES (?,?,?,?)",
        [fullname,verifiedNumber,email,password,email],
        (err,result) => {
            console.log(err);
        }

    );
});

app.post("/login", (req , res )=> {
    const verifiedNumber=req.body.verifiedNumber;
    const password=req.body.password;
      res.set('Access-Control-Allow-Origin','*')
      db.query(
          "SELECT * FROM users  WHERE verifiednumber= ? AND password = ?",
          [verifiedNumber,password],
          (err, result) =>{
              if (err) {
                res.send({err:err});
              }
              if (result){
                res.send(result);
                }
                else{
                    res.send({ message: "wrong username/ password combination!"});
                }
          }  
      );
});

app.post('/user', (req, res) => {
    const { name, email } = req.body;
  
    // Insert name and email into MySQL database
    const query = 'INSERT INTO emailusers (name, email) VALUES (?, ?)';
    connection.query(query, [name, email], (error, results) => {
      if (error) {
        console.error('Error inserting data into MySQL:', error);
        res.sendStatus(500); // Send internal server error status
        return;
      }
    });
    });


app.post("/patient", (req , res )=> {
    const name=req.body.name;
    const dateOfBirth=req.body.dateOfBirth;
    const gender=req.body.gender;
    const phoneNo=req.body.phoneNo;
    const address=req.body.address;
    const city=req.body.city;
    const state=req.body.state;
    const appointmentDate=req.body.appointmentDate;
    const preference1=req.body.preference1;
    const preference2=req.body.preference2;
    const preference3=req.body.preference3;

    console.log("patient form called ")
    console.log(name)
      res.set('Access-Control-Allow-Origin','*')
      db.query(
        "INSERT INTO appoint_details(name,dateOfBirth,gender,phoneNo,address,city,state,appointmentDate,preference1,preference2,preference3) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
        [name,dateOfBirth,gender,phoneNo,address,city,state,appointmentDate,preference1,preference2,preference3],
        (err,result) => {
            console.log(err);
        }

    );
});

app.listen(4000, ()=>{
    console.log("running server at port 4000")
});