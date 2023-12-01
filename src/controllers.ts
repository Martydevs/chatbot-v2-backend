import { Request, Response } from "express";
import BaseResponse from "./interfaces/base-response";
import { CompletionRequest } from "./interfaces/chat-response";
import { aiConfiguration } from "./config";
import dotenv from "dotenv";
dotenv.config();

type ENVAR = undefined | string;

const OPENAI_APIKEY: string = process.env["OPENAI_APIKEY"] || "";
const FILE_ID: ENVAR = process.env["OPENAI_ASSISTANT_DATASET_ID"] ?? "";
const ASSISTANT_ID: ENVAR = process.env["OPENAI_ASSISTANT_ID"] ?? "";

const ai = aiConfiguration(OPENAI_APIKEY);

export const Root = (req: Request, res: Response) => {
  res.send("Hello World!");
};

export const ChatCompletion = async (req: Request, res: Response) => {
  const body = req.body as CompletionRequest;
  const response: BaseResponse<CompletionRequest> = {
    data: body,
    exception: null,
    success: true,
    requestDate: new Date().toLocaleDateString(),
    responseDate: new Date().toLocaleDateString(),
  };
  try {
    const completion = await ai.chat.completions.create({
      messages: [
        {
          role: "assistant",
          content: `
            Hablarás en español, serás un asistente virtual
            para la universidad metropolitana de monterrey;

            La Universidad esta enfocada en Ingenierías y Sistemas.

            Tu nombre es leonardo, podrás responder preguntas
            dentro y fuera del contexto de la universidad.

            La pregunta es: ${response.data.messages[0].content}
          `,
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
};

export const AssistantCompletion = async (req: Request, res: Response) => {
  const body = req.body as string;
  const { assistants, threads } = ai.beta;
  const assistant = assistants.retrieve(ASSISTANT_ID);
  const thread = await threads.create();
  const message = await threads.messages.create(thread.id, {
    role: "user",
    content: "Cual es el edificio con mas programas disponibles?",
  });
  const runCreated = await threads.runs.create(thread.id, {
    assistant_id: (await assistant).id,
  });
  const run = await threads.runs.retrieve(thread.id, runCreated.id);
  const messages = await threads.messages.list(thread.id);
  res.status(200).json({ messages });
};

export const SubmitFile = async (req: Request, res: Response) => {
  const myAssistantFile = await ai.beta.assistants.files.create(
    ASSISTANT_ID,
    {
      file_id: FILE_ID,
    }
  );
  console.log(myAssistantFile);
};
