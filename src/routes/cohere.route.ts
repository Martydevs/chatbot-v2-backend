import { Input } from "../validator";
import { Request, Response } from "express";

export const postGenerateCohere = async (req: Request, res: Response) => {
  const input = req.body as Input;
  try {
    const response = await fetch("https://api.cohere.ai/v1/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: input.prompt }),
    });
    res.status(200).json(await response.json());
    if(!response.ok) {
      throw new Error("Ocurrió un error en la respuesta".concat(response.statusText));
    }
  } catch (error) {
    res.status(400).json({ error });
  }
}