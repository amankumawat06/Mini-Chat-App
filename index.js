let express = require("express");
let app = express();
const port = 8080;
let path = require("path");
let mongoose = require("mongoose");
let Chat = require("./models/chat.js");
const { url } = require("inspector");
const methodOverride = require("method-override");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

main()
  .then((res) => {
    console.log("Connection Successfull!");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

// Index Route

app.get("/chats", async (req, res) => {
  let chats = await Chat.find();
  // console.log(chats);
  res.render("index.ejs", { chats });
});

// Add new Chat

app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});

// Create Route

app.post("/chats", (req, res) => {
  let { from, to, msg } = req.body;
  let newChat = new Chat({
    from: from,
    to: to,
    msg: msg,
    created_at: new Date(),
  });
  newChat
    .save()
    .then((res) => {
      // console.log(res)
    })
    .catch((err) => {
      console.log(err);
    });
  res.redirect("/chats");
});

// Edit Route

app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);
  res.render("edit.ejs", { chat });
});

// Update Route

app.patch("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let { msg: newMsg } = req.body;
  let upd = await Chat.findByIdAndUpdate(id, { msg: newMsg });
  res.redirect("/chats");
});

// Delete Route

app.delete("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let deleteChat = await Chat.findByIdAndDelete(id);
  res.redirect("/chats");
});

app.get("/", (req, res) => {
  res.send("working well!..");
});

app.listen(port, () => {
  console.log("Listening on Port 8080");
});
