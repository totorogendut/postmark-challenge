import { OPENAI_API_KEY, GEMINI_API_KEY, ANTHROPIC_API_KEY } from "$env/static/private";
import { createAnthropic } from "@ai-sdk/anthropic";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import type { LanguageModelV1 } from "ai";

export const anthropic = createAnthropic({
	apiKey: ANTHROPIC_API_KEY,
});

export const openai = createOpenAI({
	apiKey: OPENAI_API_KEY,
});

export const gemini = createGoogleGenerativeAI({
	apiKey: GEMINI_API_KEY,
});

export const LLMs = {
	structuredOutputs: [
		!!OPENAI_API_KEY && openai("gpt-4.1", { structuredOutputs: true }),
		!!GEMINI_API_KEY && gemini("gemini-2.5-flash-preview-04-17", { structuredOutputs: true }),
	].filter((llm) => !!llm),
	text: [
		!!ANTHROPIC_API_KEY && anthropic("claude-4-opus-20250514"),
		!!OPENAI_API_KEY && openai("gpt-4.1"),
		!!GEMINI_API_KEY && gemini("gemini-2.5-flash-preview-04-17"),
	].filter((llm) => !!llm),
};

interface LLMOpts {
	structuredOutputs?: boolean;
}

export const getRandomLLM = (opts?: LLMOpts): LanguageModelV1 => {
	if (opts?.structuredOutputs)
		return LLMs.structuredOutputs[Math.floor(Math.random() * LLMs.structuredOutputs.length)];

	return LLMs.text[Math.floor(Math.random() * LLMs.text.length)];
};
