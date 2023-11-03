import express, { Request, Response, Application, NextFunction } from "express";
import bodyParser from "body-parser";
import router from "./routes";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();
const PORT = process.env["SERVER_PORT"] || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Authorization", `Bearer ${process.env["COHERE_APIKEY_DEV"]}`)
  next();
});

app.use(router)

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
