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
		from: "from-purple-300",
		to: "to-green-300",
		main: "bg-red-400",
		text: "text-green-800",
	},
	promotion: {
		from: "from-green-300",
		to: "to-blue-400",
		main: "bg-green-400",
		text: "text-black/80",
	},
	collaboration: {
		from: "from-red-400",
		to: "to-yellow-300",
		main: "bg-red-400",
		text: "text-white/80",
	},
	relaxed: {
		from: "from-red-400",
		to: "to-yellow-300",
		main: "bg-red-400",
		text: "text-white/80",
	},
	formal: {
		from: "from-red-400",
		to: "to-yellow-300",
		main: "bg-red-400",
		text: "text-white/80",
	},
	humorous: {
		from: "from-red-400",
		to: "to-yellow-300",
		main: "bg-red-400",
		text: "text-white/80",
	},
	angry: {
		from: "from-red-400",
		to: "to-yellow-300",
		main: "bg-red-400",
		text: "text-white/80",
	},
	sad: {
		from: "from-red-400",
		to: "to-yellow-300",
		main: "bg-red-400",
		text: "text-white/80",
	},
	polite: {
		from: "from-red-400",
		to: "to-yellow-300",
		main: "bg-red-400",
		text: "text-white/80",
	},
	individual: {
		from: "from-red-400",
		to: "to-yellow-300",
		main: "bg-red-400",
		text: "text-white/80",
	},
	organization: {
		from: "from-red-400",
		to: "to-yellow-300",
		main: "bg-red-400",
		text: "text-white/80",
	},
	government: {
		from: "from-red-400",
		to: "to-yellow-300",
		main: "bg-red-400",
		text: "text-white/80",
	},
} as const;
