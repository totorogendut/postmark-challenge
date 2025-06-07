export const DAY_IN_MS = 1000 * 60 * 60 * 24;

export async function hashPassword(password: string, salt?: Uint8Array): Promise<string> {
	const encoder = new TextEncoder();
	const passwordData = encoder.encode(password);
	const generatedSalt = salt || crypto.getRandomValues(new Uint8Array(16));

	const key = await crypto.subtle.importKey("raw", passwordData, { name: "PBKDF2" }, false, [
		"deriveBits",
	]);

	const derivedBits = await crypto.subtle.deriveBits(
		{
			name: "PBKDF2",
			salt: generatedSalt,
			iterations: 100_000,
			hash: "SHA-256",
		},
		key,
		256,
	);

	const hashArray = new Uint8Array(derivedBits);
	const full = new Uint8Array([...generatedSalt, ...hashArray]);

	// Return base64-encoded hash + salt
	return btoa(String.fromCharCode(...full));
}

export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
	const data = atob(storedHash);
	const bytes = new Uint8Array([...data].map((char) => char.charCodeAt(0)));

	const salt = bytes.slice(0, 16);
	const hash = bytes.slice(16);

	const encoder = new TextEncoder();
	const passwordData = encoder.encode(password);

	const key = await crypto.subtle.importKey("raw", passwordData, { name: "PBKDF2" }, false, [
		"deriveBits",
	]);

	const derivedBits = await crypto.subtle.deriveBits(
		{
			name: "PBKDF2",
			salt,
			iterations: 100_000,
			hash: "SHA-256",
		},
		key,
		256,
	);

	const derivedHash = new Uint8Array(derivedBits);

	return (crypto as any).timingSafeEqual
		? (crypto as any).timingSafeEqual(derivedHash, hash)
		: derivedHash.every((b, i) => b === hash[i]);
}
