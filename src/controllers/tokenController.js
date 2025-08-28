import fetchTokenPrice from "../services/tokenService.js";
import { Prisma } from "../config/db.js";

export const getDetail = async (req, res) => {
  try {
    const id = req.params.id;

    // Fetch token data from API
    const tokendata = await fetchTokenPrice(id);
    console.log(tokendata);

    // Set timestamps
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours later

    // Insert only if it doesn't exist
    await Prisma.data.create({
      data: {
        id: parseInt(tokendata.id),
        price: (tokendata.price),
        volume_24h: (tokendata.volume_24h),
        percent_change_1h: (tokendata.percent_change_1h),
        percent_change_24h: tokendata.percent_change_24h,
        percent_change_7d: tokendata.percent_change_7d,
        createdAt: now,
        expiresAt: expiresAt,
      },
    });

    res.status(200).json(tokendata);
  } catch (error) {
    // If ID already exists, Prisma will throw an error because create won't overwrite
    res.status(500).json({ error: error.message });
  }
};
