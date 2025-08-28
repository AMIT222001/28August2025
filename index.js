import axios from "axios";


const apiKey = "3c3d3fa3-3ecf-4e2c-86ad-7753b41497f7";

async function fetchTokenPrice(tokenId) {
  try {
    const response = await axios.get(" https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest? ", {
      headers: {
        "X-CMC_PRO_API_KEY": apiKey,
      },
      params: {
        id: tokenId, // Example: 1 for Bitcoin, 1027 for Ethereum
        convert: "USD",
      },
    });

    let data = response["data"]
  
    

    const price = data.data[tokenId].quote.USD;
    const details={
      id:tokenId,
      price:(price.price).toString(),
      volume_24h:(price.volume_24h).toString(),
      percent_change_1h:(price.percent_change_1h).toString(),
      percent_change_24h:(price.percent_change_24h).toString(),
      percent_change_7d:(price.percent_change_7d).toString(),
      market_cap:(price.market_cap).toString(),
    }
    console.log(typeof(details.percent_change_1h));
    
  } catch (error) {
    console.error("Error fetching token price:", error.message);
  }
}

fetchTokenPrice(1); // Example: Fetch Bitcoin
