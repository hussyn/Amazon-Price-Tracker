const axios = require('axios');
const cheerio = require('cheerio');

exports.retrievePrice = async (url) => {
    const res = await axios.get(url);
    const $ = cheerio.load(res.data);
    const dealPrice = $('#priceblock_dealprice').text();
    if (dealPrice) return dealPrice;

    const regularPrice = $('#priceblock_ourprice').text();
    return regularPrice;

};

exports.convertPriceStringToPennies = (priceStr) => {
    if (priceStr.startsWith('$')) {
        priceStr = priceStr.substring(1);
    }
    const priceNumber = parseFloat(priceStr);
    const priceInPennies = priceNumber * 100;
    return priceInPennies;
};
