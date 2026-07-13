import express from 'express'
import {signUp, login} from '../controllers/userLogic.js'

const router = express.Router()

router.post("/signup", signUp)
router.post("/login", login)

export default router
