const express = require("express");
const cors = require("cors");

const { DATABASE_CONFIG, SERVER_CONFIG } = require("./config");
const router = require("./routes");
DATABASE_CONFIG.connect();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

app.use("/api", router);
app.listen(SERVER_CONFIG.PORT, () => {
  console.log(`Server is running on port ${SERVER_CONFIG.PORT}`);
});
