import { Router } from "express";
import AuthRoutes from './AuthRoutes.js'

const router = Router();
router.use('/api',AuthRoutes);
export default router;