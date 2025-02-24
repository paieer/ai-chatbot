import { openai } from "@ai-sdk/openai";
import { google } from "@ai-sdk/google";
import { fireworks } from "@ai-sdk/fireworks";
import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from "ai";

export const DEFAULT_CHAT_MODEL: string = "chat-model-large";

export const myProvider = customProvider({
  languageModels: {
    "chat-model-small": google("gemini-2.0-flash-lite-preview-02-05"),
    "chat-model-large": google("gemini-2.0-pro-exp-02-05"),
    "chat-model-reasoning": wrapLanguageModel({
      model: google("gemini-2.0-flash-thinking-exp-01-21"),
      middleware: extractReasoningMiddleware({ tagName: "think" }),
    }),
    // "chat-model-reasoning": wrapLanguageModel({
    //   model: fireworks("accounts/fireworks/models/deepseek-r1"),
    //   middleware: extractReasoningMiddleware({ tagName: "think" }),
    // }),
    "title-model": google("gemini-2.0-pro-exp-02-05"),
    "block-model": google("gemini-2.0-pro-exp-02-05"),
  },
  imageModels: {
    "small-model": openai.image("dall-e-2"),
    "large-model": openai.image("dall-e-3"),
  },
});

interface ChatModel {
  id: string;
  name: string;
  description: string;
}

export const chatModels: Array<ChatModel> = [
  {
    id: "chat-model-small",
    name: "Small model",
    description: "Small model for fast, lightweight tasks",
  },
  {
    id: "chat-model-large",
    name: "Large model",
    description: "Large model for complex, multi-step tasks",
  },
  {
    id: "chat-model-reasoning",
    name: "Reasoning model",
    description: "Uses advanced reasoning",
  },
];
