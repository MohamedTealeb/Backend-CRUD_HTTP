import {Router} from "express";
import * as user from "./user.servive.js";
const router=Router();
router.get('/:userId',user.profile)
router.patch('/:userId',user.updateProfile)
router.delete('/truncate',user.truncateusers)
router.delete('/:userId/freeze',user.freezeProfile)
router.delete('/:userId/hard',user.hardDeleteProfile)
router.patch('/:userId/restore',user.restoreProfile)
export default router