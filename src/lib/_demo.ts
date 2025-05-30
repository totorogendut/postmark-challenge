export const demoData = {
	user: {
		name: "Alex",
		email: "alex@example.com",
		avatar: "/demo/avatar.png",
	},
};

export const demoInbox = [
	{
		subject: "Sponsorship Opportunity with TechWorld",
		textBody:
			"We would love to collaborate with you on our upcoming product launch event. Your audience perfectly aligns with our goals.",
		summary:
			"An invitation to collaborate on a product launch as part of a sponsorship deal.",
		mailFrom: "sponsor@techworld.com",
		mailFromName: "Emily Carter",
		categories: ["sponsorship", "organization", "formal"],
	},
	{
		subject: "Advertisement Placement Inquiry",
		textBody:
			"Would you be open to placing a banner ad for our upcoming campaign on your platform for the next 30 days?",
		summary:
			"Inquiry about placing a banner advertisement on the recipient’s platform.",
		mailFrom: "ads@brandbuzz.com",
		mailFromName: "Mark Lee",
		categories: ["advertisement", "organization", "polite"],
	},
	{
		subject: "Let's Collaborate on a Fun Project!",
		textBody:
			"We admire your work and believe a joint campaign could be beneficial for both our audiences. Let’s chat!",
		summary:
			"Proposal for a potential collaboration campaign between influencers or brands.",
		mailFrom: "creative@influencehub.com",
		mailFromName: "Sara Kim",
		categories: ["collaboration", "individual", "relaxed"],
	},
	{
		subject: "Government Notice: Tax Update 2025",
		textBody:
			"This is an official notice from the tax department regarding updates to personal income tax regulations for 2025.",
		summary:
			"An official email detailing changes to tax rules from the government.",
		mailFrom: "noreply@gov.tax",
		categories: ["government", "formal"],
	},
	{
		subject: "We Miss You! Come Back for a Discount",
		textBody:
			"We noticed you haven’t logged in for a while. Here’s a 20% discount to welcome you back!",
		summary:
			"A promotional email encouraging a return to a service with a discount offer.",
		mailFrom: "hello@shopnow.com",
		categories: ["promotion", "organization", "humorous"],
	},
	{
		subject: "Your Order Has Shipped",
		textBody:
			"Your recent purchase has been shipped. You can track it using the link below. Thank you for shopping with us!",
		summary: "A shipping confirmation email with tracking details.",
		mailFrom: "shipping@megastore.com",
		categories: ["formal", "organization"],
	},
	{
		subject: "Sorry to See You Go",
		textBody:
			"We’re sorry to see you unsubscribe. If there’s anything we can improve, please let us know.",
		summary:
			"A polite goodbye message after a user unsubscribes from a service.",
		mailFrom: "support@newsletter.com",
		categories: ["sad", "polite", "organization"],
	},
	{
		subject: "Monthly Update from Your Local Council",
		textBody:
			"Here's what your community has been up to this month. Check out events, announcements, and upcoming projects.",
		summary:
			"Monthly newsletter from the local government sharing updates and events.",
		mailFrom: "council@citygov.org",
		categories: ["government", "relaxed"],
	},
	{
		subject: "We Need to Talk About That Delivery",
		textBody:
			"This is unacceptable. Our package arrived a week late and was damaged. Please address this immediately.",
		summary:
			"A complaint regarding a late and damaged delivery, expressing frustration.",
		mailFrom: "angrycustomer@domain.com",
		categories: ["angry", "individual"],
	},
	{
		subject: "Your Invoice for March 2025",
		textBody:
			"Please find attached your invoice for services rendered in March. Payment is due within 15 days.",
		summary:
			"Invoice notification with payment instructions for March services.",
		mailFrom: "billing@servicecorp.com",
		categories: ["formal", "organization"],
	},
	{
		subject: "A Humorous Look at Our Tech Fails",
		textBody:
			"Enjoy this fun newsletter where we poke fun at our own tech mishaps. Laughter guaranteed!",
		summary: "A lighthearted and humorous tech newsletter.",
		mailFrom: "funny@techfails.net",
		categories: ["humorous", "organization"],
	},
	{
		subject: "Urgent: Account Security Alert",
		textBody:
			"We’ve detected a suspicious login to your account. Please reset your password immediately.",
		summary: "A security warning email about suspicious login activity.",
		mailFrom: "security@onlinesafe.com",
		categories: ["formal", "organization"],
	},
	{
		subject: "You’re Invited to Our Exclusive Mixer",
		textBody:
			"Join us for an invite-only evening of networking and cocktails with fellow creators and sponsors.",
		summary:
			"Invitation to an exclusive networking event for creators and sponsors.",
		mailFrom: "events@creatorcircle.com",
		categories: ["sponsorship", "collaboration", "formal"],
	},
	{
		subject: "Just Checking In 😊",
		textBody:
			"Hey there! Just wanted to say hi and see how you’ve been. Miss our chats!",
		summary: "A casual check-in message from an individual.",
		mailFrom: "friend@email.com",
		categories: ["individual", "relaxed"],
	},
	{
		subject: "Holiday Closure Announcement",
		textBody:
			"Please note our offices will be closed from Dec 24 to Jan 2. We wish you happy holidays!",
		summary: "An announcement about office closure during the holidays.",
		mailFrom: "info@company.com",
		categories: ["formal", "organization"],
	},
	{
		subject: "Special Promotion Just for You!",
		textBody:
			"For the next 48 hours, enjoy 30% off your next purchase. Don’t miss this exclusive deal!",
		summary: "Time-limited promotional offer sent directly to the recipient.",
		mailFrom: "offers@bestdeals.com",
		categories: ["promotion", "organization"],
	},
	{
		subject: "Join Our Beta Test Program",
		textBody:
			"We’re launching something new, and you’re invited to test it first. Sign up now!",
		summary: "Invitation to join a beta test for a new product or service.",
		mailFrom: "beta@startup.io",
		categories: ["collaboration", "individual", "polite"],
	},
	{
		subject: "A Personal Note of Thanks",
		textBody:
			"Thank you for your support over the years. Your feedback has helped us grow immensely.",
		summary:
			"A heartfelt thank you message from an individual or small company.",
		mailFrom: "thanks@handcrafted.com",
		categories: ["polite", "individual", "sad"],
	},
	{
		subject: "Public Safety Alert in Your Area",
		textBody:
			"A fire has been reported in your neighborhood. Please follow evacuation instructions immediately.",
		summary: "Urgent safety notice issued by a government authority.",
		mailFrom: "alerts@citysafety.gov",
		categories: ["government", "angry", "formal"],
	},
	{
		subject: "Let’s Laugh Together – Friday Memes Inside",
		textBody:
			"It’s meme Friday! Wind down your week with a dose of humor straight from our team.",
		summary: "A casual and humorous end-of-week meme roundup email.",
		mailFrom: "memes@fridayfunny.com",
		categories: ["humorous", "organization", "relaxed"],
	},
] as const;
