//---------------------Require Ejs----------------------------------------------------

const express = require("express");
const app = express();
const path = require("path");
const port = 8080;
//----------------------Data Parse---------------------------------------------------
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//----------------------method over ride----------------------------------------------
var methodOverride = require('method-override')
app.use(methodOverride('_method'))

//-----------------------------Mongoose------------------------------------------------
const mongoose = require("mongoose");

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp")
}

main().then(() => { console.log("Connection Successfull....."); })
    .catch(() => { console.log("Error in connection...."); })

const Chat = require("./models/chat.js");

let chat1 = new Chat({
    from: "Raj",
    to: "ragini",
    message: "hello kaisi hjo app......",
    created_at: new Date(),
});
//chat1.save();

//chat1.save().then(()=>{console.log("Message Saved Successfully");})
//.catch(()=>{console.log("Error while saving");})

//--------------------------------EJS----------------------------------

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "/public/css")));
app.use(express.static(path.join(__dirname, "/public/js")));

app.listen(port, () => {
    console.log(`port is listening on ${port}`);
});

//--------------------------routing-------------------------------------------
//REST -> CRUD (Create, Read, Update, Delete)(Routing)

app.get("/", (req, res) => {
    res.render("homepage.ejs")
});

//---------------------------Read Operations-------------------------------------

app.get("/chats", async (req, res) => {
    let data = await Chat.find()
    console.log(data);
    res.render("chat.ejs", { data })
});

//----------------------------create (Write Operations) ---------------------------------------

app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/chats", (req, res) => {
    let { from, to, msg } = req.body;

    let newChat = new Chat({
        from: from,
        to: to,
        message: msg,
        created_at: new Date(),
    })
    newChat.save().then(() => { console.log("message sent succesfulluy") })

    res.redirect("/chats");
})

//-----------------------------Update-----------------------------------

app.get("/chats/:id/edit/",async(req,res)=>{
let {id}=req.params;
let chat=await Chat.findById(id);
res.render("edit",{chat});
})

app.put("/chats/:id",(req,res)=>{
let {id}=req.params;
let{message:newMsg}=req.body;

Chat.findByIdAndUpdate({_id : id},{message:newMsg}).then(()=>{console.log("message updated successfully");})
//_id -> id
res.redirect("/chats");
})

//------------------------Delete Route-------------------------------------

app.delete("/chats/:id",(req,res)=>{
 let {id}=req.params;
 Chat.findByIdAndDelete({_id : id}).then(()=>{console.log("msg deleted successfully...........");})
 res.redirect("/chats");

})