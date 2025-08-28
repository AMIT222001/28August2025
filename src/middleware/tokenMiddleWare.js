import { Prisma } from "../config/db.js";

export const tokenMiddleware = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const existing = await Prisma.data.findUnique({
      where: { id: id },
    });

    if (existing) {
      delete existing.createdAt;
      delete existing.expiresAt;
      console.log("Fetching from database...");
      return res.status(200).json(existing); // send response if exists
    }

    // If data does NOT exist, continue to next middleware
    next();

  } catch (err) {
    console.error(err);
    next(err); // forward error to error-handling middleware
  }
};
