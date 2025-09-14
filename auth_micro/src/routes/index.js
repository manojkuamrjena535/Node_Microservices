import express from 'express';
import * as ctrl from '../controllers/auth.controller.js';


const router = express.Router();
router.get('/health', ctrl.health); //for api check
router.post('/register', ctrl.register);
router.post('/login', ctrl.login);
router.post('/verify', ctrl.verifyEndpoint);
export default router;