import "reflect-metadata";
import { Request, Response } from "express";

const express = require("express");
const fs = require("fs");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.PORT || 3000;
require("dotenv").config();

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
  const productList = await fetch(process.env.BACKEND_URL + "/products", {
    method: "get",
    mode: "cors",
    headers: {
      "Content-Type": "text/json",
    },
  }).catch((err) => console.log(err));

  console.log(process.env.BACKEND_URL + "/products");

  if (!productList) return res.status(404).send("Could not load products");

  return res.render("index", {
    token: req.cookies?.token,
    products: await productList.json(),
  });
});

app.get("/account", (req: Request, res: Response) => {
  res.render("account", {
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
