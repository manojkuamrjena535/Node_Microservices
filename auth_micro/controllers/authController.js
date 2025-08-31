import bcrypt from 'bcrypt';
import prisma from "../config/db.config.js";
import joi from "joi";
import { generateToken } from '../utils/jwt.js'; // fixed relative path

class AuthController {
    // ------------------------------------------------------------------ Register ---------------------------------------------------------------------
    static async register(req, res) {
        try {
            const schema = joi.object({
                name: joi.string().min(3).max(50).required(),
                email: joi.string().email().required(),
                password: joi.string().min(6).required()
                    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$'))
                    .message({
                        'string.pattern.base': 'Password must include uppercase, lowercase, and number'
                    }),
            });

            const { error } = schema.validate(req.body, { abortEarly: false });
            if (error) {
                return res.status(400).json({
                    message: 'Validation failed',
                    errors: error.details.map(err => err.message),
                });
            }

            const { name, email, password } = req.body;
            const existUser = await prisma.user.findUnique({ where: { email } });

            if (existUser) {
                return res.status(409).json({ message: 'Email is already registered' });
            }

            const salt = bcrypt.genSaltSync(10);
            const hashPassword = bcrypt.hashSync(password, salt);

            const user = await prisma.user.create({
                data: { name, email: email.toLowerCase(), password: hashPassword },
                select: { id: true, name: true, email: true, created_at: true }
            });

            return res.status(201).json({
                message: 'User registered successfully',
                user
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    // ------------------------------------------------------------------ Login ---------------------------------------------------------------------
    static async login(req, res) {
        try {
            const schema = joi.object({
                email: joi.string().email().required(),
                password: joi.string().required(),
            });

            const { error } = schema.validate(req.body);
            if (error) {
                return res.status(400).json({
                    message: 'Validation failed',
                    errors: error.details.map(err => err.message)
                });
            }

            const { email, password } = req.body;
            const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });

            if (!user || !bcrypt.compareSync(password, user.password)) {
                return res.status(401).json({ message: 'Invalid Credentials' });
            }

            const token = generateToken({ id: user.id, email: user.email });

            return res.status(200).json({
                access_token:`Bearer ${token}`,
                user: {name: user.name},
                message:""
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}

export default AuthController;
