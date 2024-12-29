const mongoose=require("mongoose");

const ChatSchema=mongoose.Schema({
    from:{
        type:String,
        required:true,
    },
    to:{
        type:String,
        required:true,
    },
    message:{
         type:String,
         maxLength:[50,"the message limit is expired...."]

    },

    created_at:{
        type:Date,
        required:true,
    }
})

const Chat=new mongoose.model("Chat",ChatSchema);

module.exports=Chat;