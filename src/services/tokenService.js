import axios from "axios";
import  env  from "../config/env.js";

const key = env.apikey;

export default  async function fetchTokenPrice(tokenId) {
  try {
    const response = await axios.get(" https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest? ", {
      headers: {
        "X-CMC_PRO_API_KEY": key,
      },
      params: {
        id: tokenId, // Example: 1 for Bitcoin, 1027 for Ethereum
        convert: "USD",
      },
    });

    let data = response["data"]
  
    

    const price = data.data[tokenId].quote.USD;
    const details={
      id:parseInt(tokenId),
      price:(price.price).toString(),
      volume_24h:(price.volume_24h).toString(),
      percent_change_1h:(price.percent_change_1h).toString(),
      percent_change_24h:(price.percent_change_24h).toString(),
      percent_change_7d:(price.percent_change_7d).toString(),
      market_cap:(price.market_cap).toString(),
    }
    console.log(details);
    return details;
  } catch (error) {
    console.error("Error fetching token price:", error.message);
  }
}

// Example: Fetch Bitcoin
