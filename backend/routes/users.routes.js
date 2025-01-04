import express from 'express'
import { addNewUser, getUserUsingId } from '../controllers/user.controller.js'

const router = express.Router();


router.get("/", getUserUsingId);

router.post("/signup", addNewUser);


export default router;