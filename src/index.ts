import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import startServer from "./controllers/server";

//Route Files
import regionRoutes from "./routes/regionRoutes";
import countryRoute from "./routes/countryRoute";

dotenv.config();

const app: Express = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

// Routes
app.use("/api", regionRoutes);
app.use("/api", countryRoute);

startServer(app, port);
