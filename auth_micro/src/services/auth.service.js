import bcrypt from 'bcrypt';
import prisma from '../config/prismaClient.js';


export async function createUser({ username, email, password }) {
const existing = await prisma.user.findUnique({ where: { email } });
if (existing) throw new Error('EMAIL_TAKEN');


const hashed = await bcrypt.hash(password, 10);
const user = await prisma.user.create({ data: { username, email, password: hashed } });
// do not return password
const { password: _p, ...rest } = user;
return rest;
}


export async function findUserByEmail(email) {
return prisma.user.findUnique({ where: { email } });
}


export async function findUserById(id) {
return prisma.user.findUnique({ where: { id } });
}