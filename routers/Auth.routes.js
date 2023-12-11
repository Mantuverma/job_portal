import { Router } from "express";
import { userRegistation } from "../contollers/registration.contoller.js";

const router = Router()

router.route('/registation').post(userRegistation);

export default router;