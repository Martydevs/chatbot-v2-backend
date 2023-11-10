import { Request, Response } from "express";
import BaseResponse from "./interfaces/base-response";
import { CompletionRequest } from "./interfaces/chat-response";
import { aiConfiguration } from "./config";
import dotenv from "dotenv";

dotenv.config();

const OPENAI_APIKEY = process.env["OPENAI_APIKEY"] || "";

export const Root = (req: Request, res: Response) => {
  res.send("Hello World!");
}

export const ChatCompletion = async (req: Request, res: Response) => {
  const { chat } = aiConfiguration(OPENAI_APIKEY);
  const body = req.body as CompletionRequest
  const response: BaseResponse<CompletionRequest> = {
    data: body,
    exception: null,
    success: true,
    requestDate: new Date().toLocaleDateString(),
    responseDate: new Date().toLocaleDateString(),
  };
  try {
    const completion = await chat.completions.create({
      messages: [
        {
          role: "assistant",
          content: `
            Hablarás en español, serás un asistente virtual
            para la universidad metropolitana de monterrey;

            Tu nombre es leonardo, podrás responder preguntas
            dentro y fuera del contexto de la universidad.

            Responde solamente con la respuesta.

            La pregunta es: ${response.data.messages[0].content}
          `
        },
      ],
      model: "gpt-3.5-turbo",
      max_tokens: 50,
      temperature: 0.9,
    });
    return res.status(200).json({ ...response, data: completion });
  } catch (error) {
    res.status(400).json({ error });
  }
}