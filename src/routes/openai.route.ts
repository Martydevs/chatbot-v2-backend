import { Request, Response } from "express";
import { aiConfiguration } from "../config";
import dotenv from "dotenv";

dotenv.config();

const OPENAI_APIKEY = process.env["OPENAI_APIKEY"] ?? "SOME KEY";

export const postGenerateGPT = async (req: Request, res: Response) => {
  const { chat } = aiConfiguration(OPENAI_APIKEY);
  try {
    const completion = await chat.completions.create({
      messages: [{ role: "user", content: "Say 'This is a test'" }],
      model: "gpt-3.5-turbo",
    });

    res.status(200).json({ completion });
  } catch (error) {
    res.status(400).json({ error });
  }
}