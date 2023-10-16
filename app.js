import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import {v4 as uuidv4} from 'uuid';
import {fun} from "./helper/getDevice.js";
import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import products from "./helper/productunder99.js";

const app  = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

console.log(products);

mongoose.connect("mongodb+srv://akash:akash@cluster0.trdd6ez.mongodb.net/mobileDB");
// mongodb+srv://akash:akash@cluster0.trdd6ez.mongodb.net/trickDB
// mongodb://127.0.0.1:27017/trickShotDB

const registerSchema = new mongoose.Schema({
    uid:String,
    name:String,
    email:String,
    password:String,
});

const bookingSchema = new mongoose.Schema({
  uid:String,
  pid:String,
  productName:String,
  price:String,
  quantity:String,
  img_url:String
});

const Registers = mongoose.model("Register",registerSchema);
const Booking = mongoose.model("Booking",bookingSchema);


app.get("/", function(req, res) {
    res.sendFile(__dirname+"/index.html");
});
  

// fun();
// fetch karega devices ko
// var data1;
// data1 = fun('headphones').then((data)=>{
//     data1 = data;
//     console.log(data1);
// });
// console.log(data1);

// SignIn
app.get("/signIn.html",function(req,res){
    res.sendFile(__dirname+"/login.html");
});

app.post("/signIn.html", function(req, res){
  const newId = uuidv4();
  const user = new Registers({
    name: req.body.username,
    email:req.body.email,
    password: req.body.password,
    uid:String(newId)
  });
  user.save();
  res.redirect("/");
});

// login
app.get("/login",function(req,res){
    res.sendFile(__dirname+"/login.html");
})

app.post("/login",function(req,res){
    const user = Registers.findOne({email:req.body.email,password:req.body.password});
    if(user){
        res.redirect("/");
    }else{
        res.send("Invalid Credentials");
    }
})

// handles my_orders
app.get("/my_orders",function(req,res){
  // here the main dynamic page come

})


// Contact Us
app.get("/contact",function(req,res){
    res.sendFile(__dirname+"/contact_us.html");
})

// USB.html
app.get("/USB",function(req,res){
    res.sendFile(__dirname+"/USB.html");
})

// Headphones.html
app.get("/Headphones",function(req,res){
    res.sendFile(__dirname+"/Headphones.html");
})
// WiredHeadphones.html
app.get("/WiredHeadphones",function(req,res){
    res.sendFile(__dirname+"/WiredHeadphones.html");
})

// PowerBankList.html
app.get("/PowerBankList",function(req,res){
    res.sendFile(__dirname+"/PowerBankList.html");
})

// ProductUnder999List.html
app.get("/ProductUnder999List",function(req,res){
    res.render('ProductUnder999List', {products:products});
    // res.sendFile(__dirname+"/ProductUnder999List.html");
})

app.post("/ProductUnder999List",function(req,res){
    try{
        const p_id = req.body.product_id;
        var img = "";
        for(var i=0;i<products.length;i++){
            if(products[i].id===p_id){
                img = products[i].img;
            }
        }
        const product_price = req.body.product_price;

        console.log(p_id);
        console.log(img);
        console.log(product_price);

        res.redirect("/");
    }catch(error){
        console.log(error);
    }
});

// Pouch.html
app.get("/Pouch",function(req,res){
    res.sendFile(__dirname+"/Pouch.html");
})

// Charger.html
app.get("/Charger",function(req,res){
    res.sendFile(__dirname+"/Charger.html");
})

// smartWatch.html
app.get("/smartWatch",function(req,res){
    res.sendFile(__dirname+"/smartWatch.html");
});



app.listen(process.env.PORT || 3001,function(){
    console.log("Server is running on port 3001");
})

// Here the dynamic pages will come
var item1 = {
    _id:1,
    name:"St. Mary's High School, 4 Bungalows, Near Versova Telephone Exchange,Andheri West",
    location:"Mumbai",
    map_url:"https://goo.gl/maps/uiHg68cVjXM2",
    image_icon:"https://www.sporloc.com/image/cache/catalog/911158FINALLOGO-286x180.jpg"
}

var item2 = {
     _id:2,
    name:"Rajasthani Sammelan Education Trust, SV Road, Malad West, Mumbai 400064",
    location:"Mumbai",
    map_url:"https://maps.app.goo.gl/5rFCzCkY3JTL3LT68",
    image_icon:"https://www.sporloc.com/image/cache/catalog/632721lOGO30-286x180.jpg"
}

var item3 = {
     _id:3,
    name:"FS Turf, Churchgate - by SPORLOC",
    location:"Mumbai",
    map_url:"https://goo.gl/maps/VJqHp2xzv7tKDRjd7",
    image_icon:"https://www.sporloc.com/image/cache/catalog/754285FinalLogo20-286x180.jpg"
}

var item4 = {
     _id:4,
    name:"Trickshot, Mulund - by SPORLOC",
    location:"Mumbai",
    map_url:"https://goo.gl/maps/axTihBSDg5mrPBwTA",
    image_icon:"https://www.sporloc.com/image/cache/catalog/714786FINALLOGO-286x180.jpg"
}

var item5 = {
     _id:5,
    name:"Play The Turf, Malad - by SPORLOC",
    location:"Mumbai",
    map_url:"https://goo.gl/maps/eD8sQWppNkSQMfDt9",
    image_icon:"https://www.sporloc.com/image/cache/catalog/805106LOGO30-286x180.jpg"
}

var item6 = {
     _id:6,
    name:"UMRB Turf, Azad Nagar - by SPORLOC",
    location:"Mumbai",
    map_url:"https://goo.gl/maps/t3D9j6AwDAgVFd6A7",
    image_icon:"https://www.sporloc.com/image/cache/catalog/506061Logo20-286x180.jpg"
}

var turfs =  [item1,item2,item3,item4,item5,item6];

var id = 0;
app.get("/booking.ejs",function(req,res){
    // console.log(turfs[0].image_icon);
    if(req.isAuthenticated()){
    res.render('booking', {turfImage:turfs});
    }else{
      res.redirect("/Registeration.html");
    }
})
app.post("/booking.ejs",function(req,res){
    id = Number(req.body.turf);
    console.log(id);
    //  turfs.forEach(function(turf){
    //     if(id===turf._id){
    //     var array = turf;
    //     }
        //   res.render('booking1',{oneturf:array});
          res.redirect("/booking1");
    // })
})

// app.get("/booking1",function(req,res){
//     res.render('/booking1',{oneturf:turf});
// })
var bool = false;
  app.get("/booking1",function(req,res){
    turfs.forEach(function(turf){
         if(id===turf._id){
        var array = turf;
        bool = true;
        if(bool){
            // console.log(turf.image_icon);
            res.render('booking1',{oneturf:array});
        }
    }
    });
})

app.get("/book_now.ejs",function(req,res){
    turfs.forEach(function(turf){
        if(id===turf._id){
        var array = turf;
           res.render('book_now',{oneturf:array});
        }
    });
});

app.post("/book_now",function(req,res){
    var turfName = req.body.turfname;
    var location = req.body.location;
    var check_in_date = req.body.check_in_date;
    var check_out_date = req.body.check_out_date;
    var timeSlot = req.body.timeslot;
    var members = req.body.members;
    var email = req.body.email;
    var phone = req.body.phone;


     const b2 = new Booking({
    turfName:turfName,
    location:location,
    check_in_date:check_in_date,
    timeSlot:timeSlot,
    members:members
})
b2.save();

 res.redirect("/successful.html");
})

app.post("/contact.html",function(req,res){
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var email = req.body.email;
    var mobile = req.body.mobile;
    var message = req.body.feedback;

    let transporter =  nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: "587",
    secure:false,
    auth: {
        user: 'apj752003@gmail.com',
        pass: 'lzwfmkgoeiquvroy'
    }
  });

   let info =  transporter.sendMail({
    from: "apj752003@gmail.com", // sender address
    to: email, // list of receivers
    subject: "Turf Booking Website Team", // Subject line
    html: "<b>Hi! Thanks for Contacting Us! Thank you for your feedback !!</b>", // html body
  });

  console.log("Message sent is %s",info.messageId);

    const b5 = new Contact({
    firstname:firstname,
    lastname:lastname,
    email:email,
    mobile_no:mobile,
    message:message
});
b5.save();

res.redirect("/successful1.html")

})

// app.get("/book_now.ejs",function(req,res){
//     res.render('book_now',{oneturf:array});
// });

app.get("/successful.html",function(req,res){
    res.sendFile(__dirname+"/successful.html");
})
app.get("/successful1.html",function(req,res){
    res.sendFile(__dirname+"/successful1.html");
})

