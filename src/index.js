const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { DATABASE_CONFIG, SERVER_CONFIG } = require("./config");
const router = require("./routes");
DATABASE_CONFIG.connect();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    // origin: SERVER_CONFIG.FRONTEND_URL,
    origin: true,
  })
);

app.use("/api", router);
app.listen(SERVER_CONFIG.PORT, () => {
  console.log(`Server is running on port ${SERVER_CONFIG.PORT}`);
});
