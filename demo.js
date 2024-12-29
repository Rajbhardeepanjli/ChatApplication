const mongoose = require("mongoose");
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp")
}

main().then(() => { console.log("Connection Successfull....."); })
    .catch(() => { console.log("Error in connection...."); })

const Chat = require("./models/chat.js");

Chat.insertMany([
    {
        from : "Deepak",
        to : "Sarvesh",
        message: "Paper kaisa gya bhai...??",
        created_at : new Date(),
     },
     {
         from : "Rehan",
         to : "Ibrahim",
         message: "Kya be kaali linux..!!",
         created_at : new Date(),
      },
      {
         from : "Yaseen",
         to : "Shweta",
         message: "Weight kamm kr le yrrr.....",
         created_at : new Date(),
      },
      {
         from : "Nikita",
         to : "Ashwini",
         message: "Paper ka padh k hua kya yrr",
         created_at : new Date(),
      },
      {
         from : "Rishi",
         to : "Aarti",
         message: "Apna kuch ho skta hai kya",
         created_at : new Date(),
      },
]).then(()=>{console.log("message sent succeefully")})