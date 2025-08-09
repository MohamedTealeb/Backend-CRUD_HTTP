import * as auth from "./auth.servive.js";
import {Router} from "express";
const router=Router();
router.post('/signup',auth.signup)
router.post('/login',auth.login)
export default router