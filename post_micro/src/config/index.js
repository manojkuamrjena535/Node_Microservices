import dotenv from 'dotenv';
import path from 'path';


dotenv.config({ path: path.resolve(process.cwd(), '.env') });


export default {
port: process.env.PORT || 5050,
jwtSecret: process.env.JWT_SECRET_KEY,
};