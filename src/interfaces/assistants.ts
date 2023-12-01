export interface Assistant {
  id: string;
  object: string;
  created_at: number;
  name: string;
  description?: any;
  model: string;
  instructions: string;
  tools: Tool[];
  file_ids: string[];
  metadata: Metadata;
}

interface Tool {
  type: string;
}

export interface Messages {
  id: string;
  object: string;
  created_at: number;
  thread_id: string;
  role: string;
  content: Content[];
  file_ids: any[];
  assistant_id: string;
  run_id: string;
  metadata: Metadata;
}

interface Metadata {}

interface Content {
  type: string;
  text: Text;
}

interface Text {
  value: string;
  annotations: any[];
}