import * as blogs from "./blogs.servive.js";
import {Router} from "express";
const router=Router();
router.get('/',blogs.listBlog)
router.post('/',blogs.createBlog)
export default router