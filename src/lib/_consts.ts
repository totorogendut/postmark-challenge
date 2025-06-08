export const SCHEMA_CONSTS = {
	SUMMARY: {
		min: 10,
		max: 256,
	},
	SENTIMENT: {
		min: -100,
		max: 100,
	},
	FRAUD_INDICATOR: {
		min: 0,
		max: 100,
	},
	SPAM_INDICATOR: {
		min: 0,
		max: 100,
	},
} as const;

export const categories = {
	business: ["sponsorship", "advertisement", "promotion", "collaboration"],
	tone: ["relaxed", "formal", "humorous", "angry", "sad", "polite"],
	senderIdentity: ["individual", "organization", "government"],
} as const;

export const allCategories = Object.values(categories).flat();
export const defaultInboxQuery = {
	limit: 10,
	offset: 0,
};

type TailwindColor =
	| `from-${string}`
	| `to-${string}`
	| `via-${string}`
	| `bg-${string}`
	| `text-${string}`
	| `#${string}`;
export const categoriesColor: Record<
	(typeof allCategories)[number],
	{ from: TailwindColor; to: TailwindColor; text: TailwindColor; main?: TailwindColor }
> = {
	sponsorship: {
		from: "from-red-400",
		to: "to-yellow-300",
		main: "bg-red-400",
		text: "text-yellow-100",
	},
	advertisement: {
		from: "from-red-400",
		to: "to-yellow-300",
		main: "bg-red-400",
		text: "text-yellow-100",
	},
	promotion: {
		from: "from-red-400",
		to: "to-yellow-300",
		main: "bg-red-400",
		text: "text-yellow-100",
	},
	collaboration: {
		from: "from-red-400",
		to: "to-yellow-300",
		main: "bg-red-400",
		text: "text-yellow-100",
	},
	relaxed: {
		from: "from-green-300",
		to: "to-blue-400",
		main: "bg-green-400",
		text: "text-indigo-800",
	},
	formal: {
		from: "from-green-300",
		to: "to-blue-400",
		main: "bg-green-400",
		text: "text-indigo-800",
	},
	humorous: {
		from: "from-green-300",
		to: "to-blue-400",
		main: "bg-green-400",
		text: "text-indigo-800",
	},
	angry: {
		from: "from-green-300",
		to: "to-blue-400",
		main: "bg-green-400",
		text: "text-indigo-800",
	},
	sad: {
		from: "from-green-300",
		to: "to-blue-400",
		main: "bg-green-400",
		text: "text-indigo-800",
	},
	polite: {
		from: "from-green-300",
		to: "to-blue-400",
		main: "bg-green-400",
		text: "text-indigo-800",
	},
	individual: {
		from: "from-purple-300",
		to: "to-green-300",
		main: "bg-red-400",
		text: "text-amber-800",
	},
	organization: {
		from: "from-purple-300",
		to: "to-green-300",
		main: "bg-red-400",
		text: "text-amber-800",
	},
	government: {
		from: "from-purple-300",
		to: "to-green-300",
		main: "bg-red-400",
		text: "text-amber-800",
	},
} as const;
