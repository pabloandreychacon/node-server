const express = require("express");
const router = express.Router();

//home con EJS
router.get("/", (req, res) => {
  const data = [
    {
      name: "Andrey",
      lastName: "Chacon",
    },
    {
      name: "Jean",
      lastName: "Chacon",
    },
  ];
  res.render("index.ejs", { people: data }); //muestra la vista index.ejs y le pasa data
});

router.get("/login", (req, res) => {
  const data = [
    {
      name: "Andrey",
      password: "password",
    },
  ];
  res.render("login.ejs", { credentials: data }); //muestra la vista index.ejs y le pasa data
});

router.get("/about", (req, res) => {
  res.send("hello about");
});
router.get("/contact", (req, res) => {
  res.send("hello contact");
});
router.post("/post", (req, res) => {
  res.send("hello post");
});
router.put("/put", (req, res) => {
  res.send("hello put");
});
router.delete("/delete", (req, res) => {
  res.send("hello delete");
});

module.exports = router;
