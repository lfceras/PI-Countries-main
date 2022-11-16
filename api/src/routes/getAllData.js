const axios = require("axios");
const { Country } = require("../db.js");

const getApiInfo = async () => {
  try {
    const allData = await axios.get(`https://restcountries.com/v3/all`);

    const response = await allData.data?.map((el) => {
      return {
        id: el.cca3,
        name: el.name.common,
        flag: el.flags[1] ? el.flags[1] : "Not found",
        continents: el.continents ? el.continents[0] : "Not found",
        capital: el.capital ? el.capital[0] : "",
        subregion: el.subregion,
        population: el.population,
        area: el.area,
      };
    });

    return response;
  } catch (error) {
    console.log("ERROR EN LA DATA", error);
  }
};

const countriesDb = async () => {
  try {
    const countries = await Country.findAll();
    if (!countries.length) {
      const arr = await getApiInfo();
      await Country.bulkCreate(arr);
    }
  } catch (error) {
    console.log("ERROR", error);
  }
};
const loadCountry = async () => {
  await countriesDb();
};
loadCountry();

module.exports = {
  getApiInfo,
  loadCountry,
  countriesDb,
};
