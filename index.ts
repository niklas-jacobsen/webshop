import "reflect-metadata";
import { Request, Response } from "express";

const express = require("express");
const fs = require("fs");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const port = 3000;

// function hallo(_req: Request, res: Response) {
//   let test = 10;
//   res.locals.test = test;
// }

app.use(express.static(__dirname + "/public"));
app.use(cookieParser());
app.use(cors());
// app.use("/product", hallo);
app.set("view engine", "ejs");

app.get("/", async (_req: Request, res: Response) => {
  const response = await fetch("http://localhost:5000/products", {
    method: "get",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((err) => console.log(err));

  if (!response) return res.status(500).send("error");

  return res.render("index", {
    products: await response.json(),
  });
});

app.get("/sale", (_req: Request, res: Response) => {
  var html = fs.readFileSync("sale.html", "utf-8");
  res.send(html);
});

app.get("/account", (_req: Request, res: Response) => {
  var html = fs.readFileSync("account.html", "utf-8");
  res.send(html);
});

app.get("/product", async (req: Request, res: Response) => {
  const response = await fetch("http://localhost:5000/user/me", {
    method: "get",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + req.cookies?.token,
    },
  }).catch((err) => console.log(err));
  if (!response) return res.status(500).send("error");
  return res.render("product", {
    user: await response.json(),
  });
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

app.get("/helpers/cookieHelper.js", (_req: Request, res: Response) => {
  var js = fs.readFileSync("helpers/cookieHelper.js", "utf-8");
  res.setHeader("content-type", "text/javascript");
  res.send(js);
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
