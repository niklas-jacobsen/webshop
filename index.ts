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

app.get("/", async (req: Request, res: Response) => {
  const productList = await fetch("http://localhost:5000/products", {
    method: "get",
    mode: "cors",
    headers: {
      "Content-Type": "text/json",
    },
  }).catch((err) => console.log(err));

  if (!productList) return res.status(500).send("error");

  return res.render("index", {
    products: await productList.json(),
    token: req.cookies?.token,
  });
});

app.get("/account", (req: Request, res: Response) => {
  res.render("account", {
    token: req.cookies?.token,
  });
});

app.get("/item/:id", async (req: Request, res: Response) => {
  const itemById = await fetch("http://localhost:5000/products/" + req.params.id, {
    method: "get",
    mode: "cors",
    headers: {
      "Content-Type": "text/json",
    },
  }).catch((err) => console.log(err));
  if (!itemById) return res.status(500).send("error");
  return res.render("product", {
    item: await itemById.json(),
    token: req.cookies?.token,
  });
});

app.get("/login", (_req: Request, res: Response) => {
  res.render("login");
});

app.get("/logout", (_req: Request, res: Response) => {
  res.clearCookie("token");
  res.redirect("/");
  res.end();
});

app.get("/register", (_req: Request, res: Response) => {
  res.render("register");
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
