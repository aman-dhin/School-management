const express = require("express");
const cors = require("cors");
require("dotenv").config();

const schoolRoutes = require("./routes/school.routes");

const app = express();
 const Port=5001;
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
  });
app.use("/", schoolRoutes);


const PORT = process.env.PORT || 5000;

app.listen(5001, () => {
  console.log(`Server running on port ${Port}`);
});