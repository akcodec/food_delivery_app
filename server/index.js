import express from "express";
import env from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import UserRoutes from "./routes/User.js";
import FoodRoutes from "./routes/Food.js";
env.config();

const app = express();
app.use(cors({
  origin: {"https://deployfood-delivery-app-dusky-eight.vercel.app"},
  methods: ["POST","GET"],
  credentials: true,
}));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true })); // for form data

// app.post("/ankit",(req,res)=>{
//   console.log(req.body);
// })

app.use("/api/user/", UserRoutes);
app.use("/api/food/", FoodRoutes);

// error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
}); 

app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Hello developers from GFG",
  });
}); 

const connectDB = () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(process.env.MONGODB_URL||"mongodb://localhost:27017/food_delivery_app")
    .then(() => console.log("Connected to Mongo DB"))
    .catch((err) => {
      console.error("failed to connect with mongo");
      console.error(err);
    });
};

const startServer = async () => {
  try {
    connectDB();
    app.listen(8080, () => console.log("Server started on port 8080"));
  } catch (error) {
    console.log(error);
  }
};

startServer();
