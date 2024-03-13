const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()

const app = express()
app.use(cors())
app.use(express.json({limit : "10mb"}))

const PORT = process.env.PORT || 8080

//mongodb
// console.log(process.env.MONGODB_URL)
mongoose.connect(process.env.MONGODB_URL)
.then(()=> console.log("Connected to Database"))
.catch((err) => console.log(err))

//schema
const userSchema = mongoose.Schema({
    firstname : String,
    lastname : String,
    email : {
        type:String,
        unique:true,


    }, 
    password : String, 
    confirmpassword : String, 
    image:String
})

//
const userModel = mongoose.model("user", userSchema)





//api
app.get("/", (req, res) => {
    res.send("Server is running")
})


//signup api

app.post("/signup", (req, res) => {
    // console.log(req.body)
    const {email} = req.body


    // userModel.findOne({email : email}, (err, result)=> {
    //     console.log(result)
    //     console.log(err)
    //     if(result)
    //     {
    //         res.send({message:"Email ID is already registered"})
    //     }
    //     else{
    //         const data = userModel(req.body)
    //         const save = data.save()
    //         res.send({message : "Successfully Signed UP"})
    //     }
    // })

    // const data1 = userModel.findOne({email : email})
    // {
    //     if(!data1)
    //     {
    //         const data = userModel(req.body)
    //         const save = data.save()
    //         res.send({message : "Registration is done successfully"})

    //     }
    //     else
    //     {
    //         res.send({message :"Email is already registered"})
    //     }
    // }

    // try {
    //     const result = await userModel.findOne({ email: email });
    //     console.log(result);
        
    //     if (result) {
    //       res.send({ message: "Email ID is already registered" });
    //     } else {
    //       const data = new userModel(req.body);
    //       await data.save();
    //       res.send({ message: "Successfully Signed UP" });
    //     }
    //   } catch (err) {
    //     console.log(err);
    //     // Handle error appropriately
    //   }

    userModel.findOne({ email: email })
  .then(result => {
    // console.log(result);

    if (result) {
      res.send({ message: "Email ID is already registered", alert:false });
    } else {
      const data = new userModel(req.body);
      return data.save();
    }
  })
  .then(() => {
    res.send({ message: "Successfully Signed UP", alert:true });
  })
  .catch(err => {
    // console.log(err);
    // Handle error appropriately
  });

      
    
})

// log in api

app.post("/login", (req, res) => {
    // console.log(req.body);
    const { email, password } = req.body
    userModel.findOne({email : email})
    .then(result=>{
        // console.log(result)
        if(result)
        {
            if (password!=result.password) {
              res.send({message : "This Password is incorrect", alert:false})
              
            }
            else
            {
              const dataSend = {
                _id: result._id,   
                firstname: result.firstname,
            lastname: result.lastname,
            email: result.email,
            image: result.image
            };
            // console.log(dataSend)
            res.send({message : "Login is successfull", alert:true, data : dataSend})
            }
            
            
        }
        else
        {
            res.send({message : "This Email ID is not avialable, Please Sign UP", alert:false})
        }
    })
})

//product Section

const schemaProduct = mongoose.Schema({
  name:String,
  category:String,
  image:String,
  price:String,
  description:String
});

const productModel = mongoose.model("product", schemaProduct)

//Upload Product
app.post("/uploadProduct", async(req, res)=>{
  // console.log(req.body)
  const data = await productModel(req.body)
  const datasave = await data.save()
  res.send({message : "Upload Successfully"})

})

app.get("/product", async(req, res)=>{
  const data = await productModel.find({})
  res.send(JSON.stringify(data))
  
})

//Payment
app.get("/checkout-payment", async(req, res)=>{
  console.log(req.body)
  res.send({message : "payment gateway", success : true})
})


app.listen(PORT, () =>console.log(`Server is running at ${PORT}`))
