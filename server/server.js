const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
// eslint-disable-next-line import/no-extraneous-dependencies
const bodyParser = require("body-parser");

//connect with db

dotenv.config({ path: "config.env" });
const ApiError = require("./utils/apiError");
const globalError = require("./middlewares/errorMiddleware");
const dbconnect = require("./config/database");
const categorieRoutes = require("./routes/categorieRoutes");
const subcategorieRoutes = require("./routes/subcategorieRoutes");
const userRoutes = require("./routes/userRoutes");

//data base connection
dbconnect();

const app = express();
//MidleWare
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode : ${process.env.NODE_ENV}`);
}

//Mount Rouutes
app.use("/api/v1/categories", categorieRoutes);
app.use("/api/v1/subcategories", subcategorieRoutes);
app.use("/api/v1/users", userRoutes);

app.all("*", (req, res, next) => {
  next(new ApiError(`Can't find this route :${req.originalUrl}`, 400));
});
//les erreur aui survient dans express
app.use(globalError);
const PORT = process.env.PORT || 3002;
const server = app.listen(PORT, () => {
  console.log(`run in port ${PORT}`);
});

//les erreur qui survient en dehors de express
process.on("unhandledRejection", (err) => {
  console.error(`unhandledRejection Error: ${err}`);
  server.close(() => {
    console.error(`snessith ...`);
    process.exit(1);
  });
});