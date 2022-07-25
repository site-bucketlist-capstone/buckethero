const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { PORT } = require("./config");
const { NotFoundError } = require ("./utils/errors");
const security = require("./middleware/security");
const authRoutes = require("./routes/auth");
const listRoutes = require("./routes/data");
const gallRoutes = require("./routes/global");
const profileRoutes = require("./routes/profile")

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

app.get("/", (req, res) => {
   res.status(200).json({ping: "pong"});
});

// check if user or token exists in header
app.use(security.extractUserFromJwt);


app.use("/auth", authRoutes)
app.use("/list", listRoutes) 
app.use("/global", gallRoutes);
app.use("/profile", profileRoutes)

app.use((req, res, next) => {
   return next(new NotFoundError());
});

app.use((error, req, res, next) => {
   const status = error.status || 500;
   const message = error.message;
   return res.status(status).json({
      error: {message, status}
   });
});

app.listen(PORT, () => {
  console.log(`🤯 Server running on http://localhost:${PORT}`)
})
