const mongoose = require("mongoose");
let Chat = require("./models/chat.js")

main().then((res) => {
    console.log("Connection Successfull!");
}).catch((err) =>{
    console.log(err);
})

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allChats = [
    {
        from : "rahul",
        to : "poonam",
        msg : "Send me your transprant pic",
        created_at : new Date()
    },
    {
        from : "nikhil",
        to : "aman",
        msg : "isme tara he dosh mana jayega",
        created_at : new Date()
    },
    {
        from : "khushi",
        to : "kanishka",
        msg : "Hello,how are you",
        created_at : new Date()
    },
    {
        from : "Shruit",
        to : "aarti",
        msg : "Aaj maths wale sir aaye the kya school?",
        created_at : new Date()
    },{
        from : "arishu",
        to : "usagi",
        msg : "All are in Alice In Borderland",
        created_at : new Date()
    }
]

Chat.insertMany(allChats);
