import { Router  } from "express";
import { getDetail} from "../controllers/tokenController.js";
import {tokenMiddleware} from "../middleware/tokenMiddleWare.js";
const router = Router();

router.get("/:id", tokenMiddleware,getDetail);
export default router;
