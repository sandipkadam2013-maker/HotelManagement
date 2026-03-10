const fs = require("fs");

// read main db.json
const data = JSON.parse(fs.readFileSync("db.json", "utf8"));

// create separate files
fs.writeFileSync("rooms.json", JSON.stringify({ rooms: data.rooms }, null, 2));
fs.writeFileSync("users.json", JSON.stringify({ users: data.users }, null, 2));
fs.writeFileSync("bookings.json", JSON.stringify({ bookings: data.bookings }, null, 2));

console.log("✅ Separate JSON files created successfully!");
