import * as authService from '../services/auth.service.js';
import { signToken, verifyToken } from '../utils/jwt.js';


export async function register(req, res) {
try {
const { username, email, password } = req.body;
if (!email || !password || !username) return res.status(400).json({ error: 'Missing fields' });


const user = await authService.createUser({ username, email, password });
return res.status(201).json({ user });
} catch (err) {
if (err.message === 'EMAIL_TAKEN') return res.status(409).json({ error: 'Email already taken' });
console.error(err);
return res.status(500).json({ error: 'Server error' });
}
}


export async function login(req, res) {
try {
const { email, password } = req.body;
if (!email || !password) return res.status(400).json({ error: 'Missing fields' });


const user = await authService.findUserByEmail(email);
if (!user) return res.status(401).json({ error: 'Invalid credentials' });


const ok = await (await import('bcrypt')).compare(password, user.password);
if (!ok) return res.status(401).json({ error: 'Invalid credentials' });


// Create token payload — keep minimal
const payload = { id: user.id, email: user.email, username: user.username };
const token = signToken(payload, '2h');
return res.json({ token });
} catch (err) {
console.error(err);
return res.status(500).json({ error: 'Server error' });
}
}


// Simple verify endpoint for debugging or service-to-service calls (not used in this demo since post_micro verifies locally)
export function verifyEndpoint(req, res) {
try {
const { token } = req.body;
if (!token) return res.status(400).json({ error: 'token required' });
const payload = verifyToken(token);
return res.json({ valid: true, payload });
} catch (err) {
return res.status(401).json({ valid: false, error: 'Invalid token' });
}
}


export function health(req, res) {
return res.json({ status: 'ok' });
}