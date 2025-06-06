// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			user: import("$lib/server/auth/user").SessionValidationResult["user"];
			session: import("$lib/server/auth/user").SessionValidationResult["session"];
		}
	}
}

export {};
