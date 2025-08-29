// syncTokenData.js
import fetchTokenPrice from "../services/tokenService.js";
import { Prisma } from "../config/db.js";
import cron from "node-cron";

// Sync a single token
async function syncToken(id) {
  try {
    const tokendata = await fetchTokenPrice(id);
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24h later

    await Prisma.data.upsert({
      where: { id: parseInt(tokendata.id) },
      update: {
        price: tokendata.price,
        volume_24h: tokendata.volume_24h,
        percent_change_1h: tokendata.percent_change_1h,
        percent_change_24h: tokendata.percent_change_24h,
        percent_change_7d: tokendata.percent_change_7d,
        createdAt: now,
        expiresAt: expiresAt,
      },
      create: {
        id: parseInt(tokendata.id),
        price: tokendata.price,
        volume_24h: tokendata.volume_24h,
        percent_change_1h: tokendata.percent_change_1h,
        percent_change_24h: tokendata.percent_change_24h,
        percent_change_7d: tokendata.percent_change_7d,
        createdAt: now,
        expiresAt: expiresAt,
      },
    });

    console.log("Token synced successfully:", tokendata.id);
  } catch (error) {
    console.error("Error syncing token:", id, error.message);
  }
}

// Sync all tokens sequentially, repeating every 2 seconds
async function syncAllTokensContinuously() {
  
      const tokens = await Prisma.data.findMany({ select: { id: true } });
  const tokenIds=tokens.map(t=>syncToken(t.id));
  


    
}


cron.schedule("*/2 * * * * *",()=>{
  console.log("Running task every second",new Date().toLocaleDateString() );
 syncAllTokensContinuously();
});

