const express = require("express");
const fs = require("fs");
const app = express();

const rooms = JSON.parse(fs.readFileSync("./data/rooms.json"));
const users = JSON.parse(fs.readFileSync("./data/users.json"));
const bookings = JSON.parse(fs.readFileSync("./data/bookings.json"));

app.get("/api/rooms", (req, res) => res.json(rooms));
app.get("/api/users", (req, res) => res.json(users));
app.get("/api/bookings", (req, res) => res.json(bookings));

app.listen(3000, () => console.log("Server running on port 3000"));
