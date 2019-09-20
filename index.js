const express= require('express');
const jwt = require('jsonwebtoken');
const app = express();
const cors = require ('cors');
const bodyParser = require('body-parser')
const mongoose = require ('mongoose');
const addStudents = require('./src/model/addStudent');
const authMiddleware = require('./src/middleware/authMiddleware')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}))
mongoose.connect("mongodb+srv://dano:Daniel-don16475@smscluster-vlgov.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser: true})
.then(() => console.log("Db connection successful!"))
.catch( err => console.log(err));   

app.use(cors());
app.use(express.urlencoded({ extended : false}));
app.use(express.json());
app.use(bodyParser.json());

app.get("/", (req, res) => {
    message = "hello and welcome to backend!";
    res.send(message);
})


app.get("/allstudents", (req, res, next) => {
    addStudents.find({})    
    .then((data) => {
        console.log(`Here is ,your data ${data}`);
        res.send(data)
    })
    .catch( err => console.log(`the error is ${err}`)
    );
        
    })

app.post('/addstudents', (req, res) => {
    const data = req.body;
    const add = new addStudents(data);
    console.log(data);
    add.save()
    .then( item => {
        res.json(item);
        console.log(item);
    })
    .catch( err => console.log(err))

    res.send('done')
})

    
app.post('/login', (req, res) => {
    const data = req.body
    console.log(req.userData)
    const {email, password} = data
    addStudents.findOne({ studentEmail: email})
    .then( user => {
        if ( user.studentPassword === password) {
            console.log("the login detail was accurate")
            jwt.sign({ user: user}, 'banana', (err, token) => {
                console.log(token)
                res.send({...user, token})
            })
        } else{
            console.log("Incorrect login details");
            
        }
        
    })
    .catch(err => console.log(err)
    );
})

app.post('/getstudent', authMiddleware, (req, res) => {
    return res.json(req.userData)
})




const port = process.env.PORT || 5005;


app.listen( port, () => console.log(`listening on port ${port}`));