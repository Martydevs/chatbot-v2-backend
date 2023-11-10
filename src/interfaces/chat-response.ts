export interface ChatResponse {
  id:                string;
  object:            string;
  created:           number;
  model:             string;
  systemFingerprint: string;
  choices:           Choice[];
  usage:             Usage;
}

export interface Choice {
  index:        number;
  message:      Message;
  finishReason: string;
}

export interface Message {
  role:    string;
  content: string;
}

export interface Usage {
  promptTokens:     number;
  completionTokens: number;
  totalTokens:      number;
}

export interface CompletionRequest {
  messages:     CompletionData[],
}

export interface CompletionData {
  content:  string
}