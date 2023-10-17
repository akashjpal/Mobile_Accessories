import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import {v4 as uuidv4} from 'uuid';
import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Imported Modules
import products from "./helper/productunder99.js";
import headphones from "./helper/headphones.js";
import bluespeak from "./helper/bulespeak.js";
import powerbank from "./helper/powerbank.js";
import wiredwheadpwhone from "./helper/wiredheaphone.js";
import usb from "./helper/usb.js";
import pouch from "./helper/pouch.js";
import charger from "./helper/charger.js";
import smartwatch from "./helper/smartwatch.js";
import transport from "./helper/transport.js";

const app  = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// console.log(products);
// console.log(headphones);
// console.log(bluespeak);
// console.log(powerbank);
// console.log(wiredwheadpwhone);
// console.log(usb);
// console.log(pouch);
// console.log(charger);

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

const mail = async (productname,productid,price,uid) => {
    const user = await Registers.findOne({uid:uid}).exec();
    const info = await transport.sendMail({
        from: 'team-ava@gmail.com', // sender address
        to: user.email, // list of receivers
        subject: "Product Booked", // Subject line
        text: "You have successfully booked your product", // plain text body
        html: '<b>ProductID is : '+productid+'</br> Product name is : '+productname+'</br>  Product Price is :'+price+'</b>', // html body
      });

  async function main() {
    // send mail with defined transport object
    const response  = await info();
    console.log("Message sent: %s", info.messageId);
}
}

const Registers = mongoose.model("Register",registerSchema);
const Booking = mongoose.model("Booking",bookingSchema);


app.get("/", function(req, res) {
    res.sendFile(__dirname+"/index.html");
});
  

var newID ;

// SignIn
app.get("/signIn",function(req,res){
    res.sendFile(__dirname+"/signIn.html");
});

app.post("/signIn", async function(req, res){
  newID = uuidv4();
  const user = new Registers({
    name: req.body.username,
    email:req.body.email,
    password: req.body.password,
    uid:String(newID)
  });
  await user.save();
  res.redirect("/");
});

// login
app.get("/login",function(req,res){
    res.sendFile(__dirname+"/login.html");
})

app.post("/login", async function(req, res) {
    try {
        const user = await Registers.findOne({ email: req.body.email }).exec();

        if (user) {
            console.log(user.name);
            console.log(user.uid);
            newID = user.uid;
            res.redirect("/");
        } else {
            res.sendFile(__dirname+"/error.html");
        }
    } catch (error) {
        console.error("Database query error:", error);
        res.status(500).send("An error occurred while searching for the user.");
    }
});

// handles my_orders
app.get("/my_orders",async function(req,res){
  // here the main dynamic page come
  if(newID == undefined){res.redirect("/login");}
  else{
    try{
        const products = await Booking.find({uid:newID});
        console.log(products);
        res.render("Orders",{orders:products});
    }catch(error){
      console.log(error);
    }
  }
});


// Contact Us
app.get("/contact",function(req,res){
    if(newID===undefined){res.redirect("/login");}
    else{
    res.sendFile(__dirname+"/contact_us.html");
    }
})

// USB.html
app.get("/USB",function(req,res){
    if(newID===undefined){res.redirect("/login");}
    else{
        res.render('USB', {usbs:usb});
    }
})

app.post("/USB",async function(req,res){
    try{
        const p_id = req.body.product_id;
        var img = "";
        var product_price = "";
        var product_name = "";
        for(var i=0;i<usb.length;i++){
            if(usb[i].id===p_id){
                img = usb[i].img;
                product_price = usb[i].real_price;
                product_name = usb[i].product_name;
            }
        }

        const product = new Booking({
            uid:String(newID),
            pid:p_id,
            productName:product_name,
            price:product_price,
            img_url:img
        });

        await product.save();
        await mail(product_name,p_id,product_price,newID);
        res.redirect("/USB");
    }catch(error){
        console.log(error);
    }
});

// Headphones.html
app.get("/Headphones",function(req,res){
    if(newID===undefined){res.redirect("/login");}
    else{
    res.render('Headphones', {headphones:headphones});
    }
})

app.post("/Headphones",async function(req,res){
    try{
        const p_id = req.body.product_id;
        var img = "";
        var product_price = "";
        var product_name = "";
        for(var i=0;i<headphones.length;i++){
            if(headphones[i].id===p_id){
                img = headphones[i].img;
                product_price = headphones[i].real_price;
                product_name = headphones[i].product_name;
            }
        }

        const product = new Booking({
            uid:String(newID),
            pid:p_id,
            productName:product_name,
            price:product_price,
            img_url:img
        });

        await product.save();
        await mail(product_name,p_id,product_price,newID);
        res.redirect("/Headphones");
    }catch(err){
        console.log(err);
    }
});

// WiredHeadphones.html
app.get("/WiredHeadphones",function(req,res){
    if(newID===undefined){res.redirect("/login");}
    else{
    res.render('WiredHeadphones', {wiredwheadpwhones:wiredwheadpwhone});
    }
});

app.post("/WiredHeadphones",async function(req,res){
    try{
        const p_id = req.body.product_id;
        var img = "";
        var product_price = "";
        var product_name = "";
        for(var i=0;i<wiredwheadpwhone.length;i++){
            if(wiredwheadpwhone[i].id===p_id){
                img = wiredwheadpwhone[i].img;
                product_price = wiredwheadpwhone[i].real_price;
                product_name = wiredwheadpwhone[i].product_name;
            }
        }

        const product = new Booking({
            uid:String(newID),
            pid:p_id,
            productName:product_name,
            price:product_price,
            img_url:img
        });

        await product.save();
        await mail(product_name,p_id,product_price,newID);
        res.redirect("/WiredHeadphones");
    }catch(error){
        console.log(error);
    }
});

// BluetoothSpeaker
app.get("/BluetoothSpeaker",function(req,res){
    if(newID===undefined){res.redirect("/login");}else{
    res.render('BluetoothSpeaker', {bluespeaks:bluespeak});
    }
});

app.post("/BluetoothSpeaker",async function(req,res){
    try{
        const p_id = req.body.product_id;
        var img = "";
        var product_price = "";
        var product_name = "";
        for(var i=0;i<bluespeak.length;i++){
            if(bluespeak[i].id===p_id){
                img = bluespeak[i].img;
                product_price = bluespeak[i].real_price;
                product_name = bluespeak[i].product_name;
            }
        }

        const product = new Booking({
            uid:String(newID),
            pid:p_id,
            productName:product_name,
            price:product_price,
            img_url:img
        });

        await product.save();
        await mail(product_name,p_id,product_price,newID);
        res.redirect("/BluetoothSpeaker");
    }catch(err){
        console.log(err);
    }
});

// PowerBankList.html
app.get("/PowerBankList",function(req,res){
    if(newID===undefined){res.redirect("/login");}else{
    res.render('PowerBankList', {powerbanks:powerbank});
    // res.sendFile(__dirname+"/PowerBankList.html");/
    }
})

app.post("/PowerBankList",async function(req,res){
    try{
        const p_id = req.body.product_id;
        var img = "";
        var product_price = "";
        var product_name = "";
        for(var i=0;i<powerbank.length;i++){
            if(powerbank[i].id===p_id){
                img = powerbank[i].img;
                product_price = powerbank[i].real_price;
                product_name = powerbank[i].product_name;
            }
        }

        const product = new Booking({
            uid:String(newID),
            pid:p_id,
            productName:product_name,
            price:product_price,
            img_url:img
        });

        await product.save();
        await mail(product_name,p_id,product_price,newID);
        res.redirect("/PowerBankList");
    }catch(err){
        console.log(err);
    }
});

// ProductUnder999List.html
app.get("/ProductUnder999List",function(req,res){
    if(newID===undefined){res.redirect("/login");}else{
    res.render('ProductUnder999List', {products:products});
    }
    // res.sendFile(__dirname+"/ProductUnder999List.html");
})

app.post("/ProductUnder999List",async function(req,res){
    try{
        const p_id = req.body.product_id;
        var img = "";
        var product_price = "";
        var product_name = "";
        for(var i=0;i<products.length;i++){
            if(products[i].id===p_id){
                img = products[i].img;
                product_price = products[i].real_price;
                product_name = products[i].product_name;
            }
        }
        console.log(newID);
        console.log(p_id);
        console.log(img);
        console.log(product_price);

        const product = new Booking({
            uid:String(newID),
            pid:p_id,
            productName:product_name,
            price:product_price,
            img_url:img
        });

        await product.save();
        await mail(product_name,p_id,product_price,newID);
        res.redirect("/ProductUnder999List");
    }catch(error){
        console.log(error);
    }
});

// Pouch.html
app.get("/Pouch",function(req,res){
    if(newID===undefined){res.redirect("/login");}else{
    res.render('Pouch', {pouchs:pouch});
    }
})

app.post("/Pouch",async function(req,res){
    try{
        const p_id = req.body.product_id;
        var img = "";
        var product_price = "";
        var product_name = "";
        for(var i=0;i<pouch.length;i++){
            if(pouch[i].id===p_id){
                img = pouch[i].img;
                product_price = pouch[i].real_price;
                product_name = pouch[i].product_name;
            }
        }

        const product = new Booking({
            uid:String(newID),
            pid:p_id,
            productName:product_name,
            price:product_price,
            img_url:img
        });

        await product.save();
        await mail(product_name,p_id,product_price,newID);
        res.redirect("/Pouch");
    }catch(error){
        console.log(error);
    }
})

// Charger.html
app.get("/Charger",function(req,res){
    if(newID===undefined){res.redirect("/login");}else{
    res.render('Charger', {chargers:charger});
    }
})

app.post("/Charger",async function(req,res){
    try{
        const p_id = req.body.product_id;
        var img = "";
        var product_price = "";
        var product_name = "";
        for(var i=0;i<charger.length;i++){
            if(charger[i].id===p_id){
                img = charger[i].img;
                product_price = charger[i].real_price;
                product_name = charger[i].product_name;
            }
        }

        const product = new Booking({
            uid:String(newID),
            pid:p_id,
            productName:product_name,
            price:product_price,
            img_url:img
        });

        await product.save();
        await mail(product_name,p_id,product_price,newID);
        res.redirect("/Charger");
    }catch(error){
        console.log(error);
    }

})

// smartWatch.html
app.get("/smartWatch",function(req,res){
    if(newID===undefined){res.redirect("/login");}else{
        res.render('smartWatch', {smartwatchs:smartwatch});
    // res.sendFile(__dirname+"/smartWatch.html");
    }
});

app.post("/smartWatch",async function(req,res){
    try{
        const p_id = req.body.product_id;
        var img = "";
        var product_price = "";
        var product_name = "";
        for(var i=0;i<smartwatch.length;i++){
            if(smartwatch[i].id===p_id){
                img = smartwatch[i].img;
                product_price = smartwatch[i].real_price;
                product_name = smartwatch[i].product_name;
            }
        }

        const product = new Booking({
            uid:String(newID),
            pid:p_id,
            productName:product_name,
            price:product_price
        });

        await product.save();
        await mail(product_name,p_id,product_price,newID);
        res.redirect("/smartWatch");
    }catch(error){
        console.log(error);
    }
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

