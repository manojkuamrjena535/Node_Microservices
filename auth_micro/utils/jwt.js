import jwt from 'jsonwebtoken';

export function generateToken(payload,expiresIn = '1d'){
    if(!process.env.JWT_SECRET_KEY){
        throw new Error('JWT_SECRET_KEY KEY is not set in env file');
    }
    return jwt.sign(payload,process.env.JWT_SECRET_KEY,{expiresIn});
}

export function verifyToken(token){
if (!process.env.JWT_SECRET_KEY) {
        throw new Error('JWT_SECRET_KEY is not defined in environment variables');
    } 
    return jwt.verify(token,process.env.JWT_SECRET_KEY);
}