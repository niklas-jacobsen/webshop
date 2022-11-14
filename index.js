//this file is unused but is being kept for the time being

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express = require("express");
const fs = require("fs");
import * as cors from "cors";
const app = express();
app.use(cors());
const port = 3000;
app.use(express.static(__dirname + "/public"));
app.get("/", (_req, res) => {
  var html = fs.readFileSync("index.html", "utf-8");
  res.send(html);
});
app.get("/sale", (_req, res) => {
  var html = fs.readFileSync("sale.html", "utf-8");
  res.send(html);
});
app.get("/account", (_req, res) => {
  var html = fs.readFileSync("account.html", "utf-8");
  res.send(html);
});
app.get("/login", (_req, res) => {
  var html = fs.readFileSync("login.html", "utf-8");
  res.send(html);
});
app.get("/register.js", (_req, res) => {
  var js = fs.readFileSync("register.js", "utf-8");
  res.setHeader("content-type", "text/javascript");
  res.send(js);
});
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
