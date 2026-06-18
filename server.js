const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const db = require("./db");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// --- SIGNUP ROUTE ---
app.post("/signup", async (req, res) => {
  const { name, age, city, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "Name, email, and password are required" });
  }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const sql = "INSERT INTO users (name, age, city, email, password) VALUES (?, ?, ?, ?, ?)";

    db.query(sql, [name, age, city, email, hashedPassword], (err, result) => {
      if (err) {
        console.error(err);
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({ success: false, message: "Email already in use" });
        }
        return res.status(500).json({ success: false, message: "Database Error" });
      }
      res.status(201).json({ success: true, message: "User Saved Successfully" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// --- LOGIN ROUTE ---
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).json({ success: false, message: "Database Error" });
    
    if (results.length === 0) {
      return res.status(404).json({ success: false, message: "User not found. Please sign up." });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Incorrect password" });
    }

    res.status(200).json({ success: true, message: "Login Successful" });
  });
});

// --- FETCH USERS ROUTE (NO PASSWORDS) ---
app.get("/users", (req, res) => {
  const sql = "SELECT id, name, age, city, email FROM users";
  
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Database Error" });
    }
    res.status(200).json(results);
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});