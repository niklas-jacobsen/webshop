import "reflect-metadata";
import { Request, Response } from "express";

const express = require("express");
const favicon = require("serve-favicon");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.PORT || 3000;
require("dotenv").config();

app.use(express.static(__dirname + "/public"));
app.use(favicon(path.join(__dirname, "favicon.ico")));
app.use(cookieParser());
app.use(cors());
app.set("view engine", "ejs");

app.get("/", async (req: Request, res: Response) => {
  const productList = await fetch(process.env.BACKEND_URL + "/products", {
    method: "get",
    mode: "cors",
    headers: {
      "Content-Type": "text/json",
    },
  }).catch((err) => console.log(err));

  if (!productList) return res.status(404).send("Could not load products");

  return res.render("index", {
    token: req.cookies?.token,
    products: await productList.json(),
    cart: JSON.parse(req.cookies?.cart || "[]"),
  });
});

app.get("/account", async (req: Request, res: Response) => {
  const currentUser = await fetch(process.env.BACKEND_URL + "/user/me", {
    method: "get",
    mode: "cors",
    headers: {
      "Content-Type": "text/json",
      Authorization: "Bearer " + req.cookies?.token,
    },
  });

  const userAddress = await fetch(process.env.BACKEND_URL + "/address/me", {
    method: "get",
    mode: "cors",
    headers: {
      "Content-Type": "text/json",
      Authorization: "Bearer " + req.cookies?.token,
    },
  });

  if (!currentUser) return res.status(404).send("Could not get user");
  if (!userAddress) return res.status(404).send("Could not get address");
  return res.render("account", {
    token: req.cookies?.token,
    user: await currentUser.json(),
    address: await userAddress.json(),
    cart: JSON.parse(req.cookies?.cart || "[]"),
  });
});

app.get("/cart", (req: Request, res: Response) => {
  res.render("cart", {
    token: req.cookies?.token,
  });
});

app.get("/item/:id", async (req: Request, res: Response) => {
  const itemById = await fetch(process.env.BACKEND_URL + "/products/" + req.params.id, {
    method: "get",
    mode: "cors",
    headers: {
      "Content-Type": "text/json",
    },
  }).catch((err) => console.log(err));
  if (!itemById) return res.status(404).send("Could not get item");
  return res.render("product", {
    token: req.cookies?.token,
    item: await itemById.json(),
    backend_url: process.env.BACKEND_URL,
    cart: JSON.parse(req.cookies?.cart || "[]"),
  });
});

app.get("/login", (_req: Request, res: Response) => {
  res.render("login", {
    backend_url: process.env.BACKEND_URL,
  });
});

app.get("/logout", (_req: Request, res: Response) => {
  res.clearCookie("token");
  res.redirect("/");
  res.end();
});

app.get("/register", (_req: Request, res: Response) => {
  res.render("register", {
    backend_url: process.env.BACKEND_URL,
  });
});

// app.get("/favicon.ico", (_req: Request, res: Response) => {
//   var favicon = fs.readFileSync("favicon.ico");
//   res.send(favicon);
// });

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

app.get("/cart.js", (_req: Request, res: Response) => {
  var js = fs.readFileSync("cart.js", "utf-8");
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
