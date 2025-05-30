import { env } from "$env/dynamic/private";
import { createAnthropic } from "@ai-sdk/anthropic";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";

export const anthropic = createAnthropic({
	apiKey: env.ANTHROPIC_API_KEY,
});

export const openai = createOpenAI({
	apiKey: env.OPENAI_API_KEY,
});
