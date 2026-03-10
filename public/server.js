const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
app.use(cors());

const roomtype = JSON.parse(fs.readFileSync("roomtype.json"));
//const users = JSON.parse(fs.readFileSync("./data/users.json"));
const bookings = JSON.parse(fs.readFileSync("bookings.json"));

app.get("/roomtype", (req, res) => res.json(roomtype));
//app.get("/api/users", (req, res) => res.json(users));
app.get("/bookings", (req, res) => res.json(bookings));

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
