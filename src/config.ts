import { OpenAI } from "openai";

export const aiConfiguration = (key: string) => new OpenAI({ apiKey: key });