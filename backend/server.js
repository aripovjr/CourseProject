const express = require("express");
const cors = require("cors");
const User = require("./models/userModel");
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const dashboardRoute = require("./routes/dashboard");
const userRoute = require("./routes/userRoute");
const users = require("./routes/users");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// Create the table if it doesn't exist
User.sync().then(() => {
  console.log("Database has been synced.");
});

app.use("/register", registerRoute);
app.use("/login", loginRoute);
app.use("/dashboard", dashboardRoute);
app.use("/user", userRoute);
app.use("/users", users);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
