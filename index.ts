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

app.get("/register.js", (_req: Request, res: Response) => {
  var js = fs.readFileSync("register.js", "utf-8");
  res.setHeader("content-type", "text/javascript");
  res.send(js);
});

app.get("/login.js", (_req: Request, res: Response) => {
  var js = fs.readFileSync("login.js", "utf-8");
  res.setHeader("content-type", "text/javascript");
  res.send(js);
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
