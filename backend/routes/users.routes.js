import express from 'express'
import { addNewUser, editUserData, getUserUsingId } from '../controllers/user.controller.js'
const router = express.Router();



router.get("/", getUserUsingId);

router.post("/signup", addNewUser);

router.patch("/", editUserData);

export default router;