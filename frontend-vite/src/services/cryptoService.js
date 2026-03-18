import axios from "axios";

export const getCryptoPrices = async () => {

const res = await axios.get(
"https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,usd-coin,polygon&vs_currencies=usd"
);

return res.data;

};