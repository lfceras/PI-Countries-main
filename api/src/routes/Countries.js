const { Router } = require("express");
const { loadCountry } = require("./getAllData.js");
const { Activity, Country } = require("../db.js");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    await loadCountry();
    let totalCountries = await Country.findAll({
      include: {
        model: Activity,
        attributes: ["name", "dificulty", "duration", "season"],
        through: { attributes: [] },
      },
    });
    if (name) {
      const filteredCountries = await totalCountries.filter((el) =>
        el.name.toLowerCase().includes(name.toLowerCase())
      );

      return filteredCountries.length
        ? res.status(200).json(filteredCountries)
        : res.status(404).send("sigue intentando");
    }
    return res.status(200).json(totalCountries);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await loadCountry();
    const totalCountries = await Country.findOne({
      where: {
        id: id.toUpperCase(),
      },
      include: {
        model: Activity,
        attributes: ["name", "dificulty", "duration", "season"],
        through: { attributes: [] },
      },
    });
    if (id) {
      totalCountries
        ? res.status(200).json(totalCountries)
        : res.status(404).send("Ningun pais coincide con este ID");
    }
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

module.exports = router;
