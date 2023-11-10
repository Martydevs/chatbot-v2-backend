import express, { Request, Response, Application, NextFunction } from "express";
import { ChatCompletion, Root } from "./controllers";
import bodyParser from "body-parser";

const app: Application = express();
const PORT = process.env["SERVER_PORT"] || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/api/", Root);

app.post("/api/openai", ChatCompletion);

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
