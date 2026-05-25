const express = require("express");
const path = require("path");

const router = express.Router();

function sendPage(res, pageName) {
  return res.sendFile(path.join(__dirname, "..", "public", "pages", pageName));
}

router.get("/", (req, res) => {
  res.redirect("/login");
});

router.get("/login", (req, res) => {
  sendPage(res, "login.html");
});

router.get("/home", (req, res) => {
  sendPage(res, "home.html");
});

router.get("/perfil", (req, res) => {
  sendPage(res, "perfil.html");
});

router.get("/culturas", (req, res) => {
  sendPage(res, "culturas.html");
});

router.get("/areas-plantio", (req, res) => {
  sendPage(res, "areas-plantio.html");
});

router.get("/area-detalhes", (req, res) => {
  sendPage(res, "area-detalhes.html");
});

module.exports = router;