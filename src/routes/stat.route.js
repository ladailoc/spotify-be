import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("Stat route is working!");
});

export default router;
