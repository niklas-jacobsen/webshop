//import "reflect-metadata";
import { Request, Response } from "express";

const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;

app.use(express.static(__dirname + "/public"));

app.get("/", function (_req: Request, res: Response) {
  var html = fs.readFileSync("index.html", "utf-8");
  res.send(html);
});

app.get("/sale", function (_req: Request, res: Response) {
  var html = fs.readFileSync("sale.html", "utf-8");
  res.send(html);
});

app.get("/account", function (_req: Request, res: Response) {
  var html = fs.readFileSync("account.html", "utf-8");
  res.send(html);
});

app.listen(port, function () {
  console.log(`App running on port ${port}`);
});
