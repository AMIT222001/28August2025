import express from "express";
import env from "./config/env.js"
import tokenRoutes from "./routes/tokenRoutes.js"
const app=express();
app.use(express.json({ limit: "50kb" }));

app.use("/api/token",tokenRoutes);
const PORT =env.port||5000;
app.listen(PORT,()=>{
  console.log(`server started on port ${PORT}`)
});