import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import crypto from "crypto";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const prisma = new PrismaClient();
const app = express();

const PORT = process.env.PORT || 4000;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:3000";
const SECRET = process.env.JWT_SECRET || process.env.SECRET || "please_change_this_secret";

app.use(express.json());
app.use(
	cors({
		origin: FRONTEND_ORIGIN,
		credentials: true,
	})
);

function base64urlEncode(input) {
	return Buffer.from(input)
		.toString("base64")
		.replace(/=/g, "")
		.replace(/\+/g, "-")
		.replace(/\//g, "_");
}

function base64urlDecode(input) {
	input = input.replace(/-/g, "+").replace(/_/g, "/");
	while (input.length % 4) input += "=";
	return Buffer.from(input, "base64").toString();
}

function genSalt() {
	return crypto.randomBytes(16).toString("hex");
}

function hashPassword(password, salt) {
	const hash = crypto.pbkdf2Sync(password, salt, 310000, 32, "sha256");
	return hash.toString("hex");
}

function signToken(payload) {
	const header = base64urlEncode(JSON.stringify({ alg: "HS256", typ: "JWT" }));
	const body = base64urlEncode(JSON.stringify(payload));
	const signature = crypto.createHmac("sha256", SECRET).update(`${header}.${body}`).digest("base64");
	const sigUrl = signature.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
	return `${header}.${body}.${sigUrl}`;
}

function verifyToken(token) {
	try {
		const parts = token.split(".");
		if (parts.length !== 3) return null;
		const [header, body, sig] = parts;
		const expected = crypto
			.createHmac("sha256", SECRET)
			.update(`${header}.${body}`)
			.digest("base64")
			.replace(/=/g, "")
			.replace(/\+/g, "-")
			.replace(/\//g, "_");
		if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
		return JSON.parse(base64urlDecode(body));
	} catch (e) {
		return null;
	}
}

app.get("/", (req, res) => {
	res.json({ ok: true, message: "DayFlow API" });
});

// Signup - creates a user and stores a salted, hashed password
app.post("/api/auth/signup", async (req, res) => {
	try {
		const { name, email, password } = req.body || {};
		if (!email || !password) return res.status(400).json({ error: "Email and password required" });

		const existing = await prisma.user.findUnique({ where: { email } }).catch(() => null);
		if (existing) return res.status(409).json({ error: "User already exists" });

		const salt = genSalt();
		const hashed = hashPassword(password, salt);
		const stored = `${salt}$${hashed}`;

		const user = await prisma.user.create({ data: { name: name || null, email, password: stored } });

		const { password: _pw, ...safe } = user;
		res.status(201).json({ user: safe });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Server error" });
	}
});

// Signin - verifies password and returns a signed token
app.post("/api/auth/signin", async (req, res) => {
	try {
		const { email, password } = req.body || {};
		if (!email || !password) return res.status(400).json({ error: "Email and password required" });

		const user = await prisma.user.findUnique({ where: { email } });
		if (!user) return res.status(401).json({ error: "Invalid credentials" });

		const stored = user.password || "";
		const [salt, hash] = stored.split("$") || [];
		if (!salt || !hash) return res.status(500).json({ error: "Malformed password on record" });

		const attempt = hashPassword(password, salt);
		if (attempt !== hash) return res.status(401).json({ error: "Invalid credentials" });

		const token = signToken({ userId: user.id, email: user.email, iat: Date.now() });

		const { password: _pw, ...safe } = user;
		res.json({ token, user: safe });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Server error" });
	}
});

// Simple protected route example
app.get("/api/me", async (req, res) => {
	try {
		const auth = req.headers.authorization || "";
		const token = auth.startsWith("Bearer ") ? auth.slice(7) : auth;
		const payload = verifyToken(token);
		if (!payload || !payload.userId) return res.status(401).json({ error: "Unauthorized" });

		const user = await prisma.user.findUnique({ where: { id: payload.userId } });
		if (!user) return res.status(404).json({ error: "User not found" });

		const { password: _pw, ...safe } = user;
		res.json({ user: safe });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Server error" });
	}
});

app.use((err, req, res, next) => {
	console.error(err);
	res.status(500).json({ error: "Unexpected server error" });
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

