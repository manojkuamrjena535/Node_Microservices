import jwt from 'jsonwebtoken';
import config from '../config/index.js';


// Sign a token with jwtSecret from env
export function signToken(payload, expiresIn = '1h') {
if (!config.jwtSecret) throw new Error('JWT secret not set');
return jwt.sign(payload, config.jwtSecret, { expiresIn });
}


export function verifyToken(token) {
if (!config.jwtSecret) throw new Error('JWT secret not set');
return jwt.verify(token, config.jwtSecret);
}