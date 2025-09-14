import { verifyToken } from '../utils/jwt.js';


export function requireAuth(req, res, next) {
const auth = req.headers.authorization;
if (!auth) return res.status(401).json({ error: 'Authorization header missing' });
const token = auth.split(' ')[1];
try {
const payload = verifyToken(token);
req.user = payload;
next();
} catch (err) {
return res.status(401).json({ error: 'Invalid token' });
}
}