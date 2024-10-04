const express = require("express");
const path = require("node:path");
const app = express();
app.use(express.urlencoded({ extended: true }));

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { title: "Mini Message Board", messages: messages });
});

app.get("/new", (req, res) => {
  res.render("frms", { title: "Send Message" });
});

app.post("/new", (req, res) => {
  const messageUser = req.body.messageUser;
  const messageText = req.body.messageText;
  messages.push({ text: messageText, user: messageUser, added: new Date() });
  res.redirect("/");
});

app.get("/message/:id", (req, res) => {
  const messageId = req.params.id;
  const message = messages[messageId];
  if (message) {
    res.render("singlemsg", {
      title: "Single message",
      messages: message,
    });
  }
});

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`My first Express app - listening on port ${PORT}!`)
);
