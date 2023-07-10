// const express = require("express");
// const jwt = require("jsonwebtoken");

// const app = express();

// app.get("/api", (req, res) => {
//   res.json({
//     message: "Welcome to api!",
//   });
// });

// app.post("/api/posts", verifyToken, (req, res) => {
//   jwt.verify(req.token, "secretKey", (err, authData) => {
//     if (err) {
//       res.sendStatus(403);
//     } else {
//       res.json({
//         message: "Post created...",
//         authData,
//       });
//     }
//   });
// });

// app.post("/api/login", (req, res) => {
//   const users = {
//     id: 1,
//     username: "jasur",
//     email: "jasur@gmail.com",
//   };

//   jwt.sign({ users }, "secretKey", { expiresIn: "1h" }, (err, token) => {
//     res.json({
//       token,
//     });
//   });
// });

// function verifyToken(req, res, next) {
//   const bearerHeader = req.headers["authorization"];

//   if (typeof bearerHeader !== "undefined") {
//     const bearer = bearerHeader.split(" ");
//     const bearerToken = bearer[1];
//     req.token = bearerToken;
//     next();
//   } else {
//     res.sendStatus(403);
//   }
// }

// app.listen(5000, () => console.log("another server 5000"));

// const express = require("express");
// const cors = require("cors");
// const { Sequelize } = require("sequelize");
// const cookieParser = require("cookie-parser");
// const User = require("../project/backend/models/userModel");
// require("dotenv").config();

// const app = express();
// app.use(express.json());
// app.use(cors());

// // Create a sequelize instance with your database configuration
// const sequelize = new Sequelize({
//   dialect: "postgres",
//   host: "127.0.0.1",
//   port: 5432,
//   username: "aripov",
//   password: 2005,
//   database: "collection",
// });

// // Define the User model
// const UserModel = new User(sequelize, Sequelize);

// // Create the table if it doesn't exist
// User.sync({ force: true });

// const registerUser = async (name, email, password, role) => {
//   try {
//     const checkUser = await UserModel.findOne({ where: { email: email } });

//     if (checkUser) {
//       return { success: false, message: "Email already exists" };
//     }

//     const newUser = await UserModel.create({
//       name,
//       email,
//       password,
//       role,
//     });

//     return { success: true, message: "User registered successfully" };
//   } catch (error) {
//     console.error("Error creating user:", error);
//     return { success: false, message: "Failed to create user" };
//   }
// };

// app.post("/register", async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;
//     const result = await registerUser(name, email, password, role);

//     if (!result.success) {
//       // Send JSON response with error message
//       return res.status(400).json({ success: false, message: result.message });
//     } else {
//       return res.status(200).json({ message: result.message });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({ success: false });
//   }
// });

// app.post("/login", (req, res) => {
//   // Implementation for login route
// });

// const PORT = process.env.PORT;
// app.listen(PORT, () => {
//   console.log(`Server is running on PORT ${PORT}`);
// });
