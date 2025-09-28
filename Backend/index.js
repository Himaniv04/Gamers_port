const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
    host: "localhost",
    user: "gameruser",       
    password: "gamer123",
     database: "subscription_db" 
});

db.connect(err => {
    if (err) {
        console.log("DB connection error:", err);
    } else {
        console.log("Connected to MySQL database!");
    }
});

// Create table if not exists
db.query(
    `CREATE TABLE IF NOT EXISTS subscribers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE
    )`,
    (err, result) => {
        if (err) console.log(err);
        else console.log("Table ready");
    }
);

// Route to save email
app.post("/subscribe", (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).send("Email is required");

  db.query("INSERT INTO subscribers (email) VALUES (?)", [email], (err, result) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).send("Email already subscribed!");
      }
      return res.status(500).send("Database error");
    }
    res.send("Subscribed successfully!");
  });
});


app.listen(5000, () => console.log("Server running on port 5000"));
