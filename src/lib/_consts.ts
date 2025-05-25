export const SCHEMA_CONSTS = {
	SUMMARY: {
		min: 10,
		max: 256,
	},
	SENTIMENT: {
		min: -100,
		max: 100,
	},
} as const;

export const categories = {
	business: ["sponsorship", "advertisement", "promotion", "collaboration"],
	tone: ["relaxed", "formal", "humorous", "angry", "sad", "polite"],
	senderIdentity: ["individual", "organization", "government"],
} as const;

export const allCategories = Object.values(categories).flat();
