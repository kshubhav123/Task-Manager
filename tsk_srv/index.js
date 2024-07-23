const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");

const { connection } = require("./config/db");
const { UserModel } = require("./models/User.model.js");

// Import task routes
const taskRoutes = require("./routes/tasks.routes");

const app = express();

// Middleware
app.use(express.json());
morgan('tiny')

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send({ msg: "Home Route" });
});

// Signup Route
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);
  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    console.error("Error while storing data in db:", error);
    res
      .status(500)
      .json({ message: "Something went wrong, please try again later" });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found, please signup first" });
    }

    console.log(user);
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res
        .status(401)
        .json({ message: "Login failed, invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
    res.status(200).json({ name: user.name, message: "Login successful", token });
  } catch (error) {
    console.error("Error while logging in:", error);
    res
      .status(500)
      .json({ message: "Something went wrong, please try again later" });
  }
});

// Task routes
app.use("/api/tasks", taskRoutes);

// Server PORT
const PORT = process.env.PORT || 8000;
app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected to db successfully");
  } catch (err) {
    console.error("Error while connecting to database:", err);
  }
  console.log(`App listening on port ${PORT}`);
});
