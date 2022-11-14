import "reflect-metadata";
import { Request, Response } from "express";

const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

app.get("/", (_req: Request, res: Response) => {
  var html = fs.readFileSync("index.ejs", "utf-8");
  res.send(html);
});

/* app.get("*", (req: Request, res: Response) => {
  const hasExtension = req.path.includes(".");
  const file = fs.readFileSync("." + req.path + (hasExtension ? "" : ".html"), "utf-8");
  res.send(file);
}); */

app.get("/sale", (_req: Request, res: Response) => {
  var html = fs.readFileSync("sale.html", "utf-8");
  res.send(html);
});

app.get("/account", (_req: Request, res: Response) => {
  var html = fs.readFileSync("account.html", "utf-8");
  res.send(html);
});

app.get("/login", (_req: Request, res: Response) => {
  var html = fs.readFileSync("login.html", "utf-8");
  res.send(html);
});

app.get("/register", (_req: Request, res: Response) => {
  var html = fs.readFileSync("register.html", "utf-8");
  res.send(html);
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
