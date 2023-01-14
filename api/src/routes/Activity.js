const { Router } = require("express");
const { Activity, Country } = require("../db.js");

const router = Router();

router.get("/", async (req, res) => {
  const { name } = req.query;

  try {
    const getAllActivities = await Activity.findAll();
    if (name) {
      const filterActivities = getAllActivities.filter((el) =>
        el.name.toLowerCase().includes(name.toLowerCase())
      );
      return filterActivities.length
        ? res.status(200).json(filterActivities)
        : res.status(404).send("No se encontraron actividades");
    }
   return res.status(200).send(getAllActivities);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const getAllActivities = await Activity.findAll();
    if (id) {
      const filterById = getAllActivities.filter((el) => el.id == id);
      return filterById.length
        ? res.status(200).send(filterById)
        : res.status(400).send("No se pudo allar actividad con ese id");
    }
    res.status(200).send(getAllActivities);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  const {
    name,
    dificulty,
    duration,
    season,
    countries,
    // create
  } = req.body;
  try {
    if (!name || !dificulty || !duration || !season || !countries) {
      return res.status(404).send("Te faltaron algunos campos");
    }
    const activityCreate = await Activity.create({
      name,
      dificulty,
      duration,
      season,
    });

    const country = await Country.findAll({
      where: { id: countries },
    });
    // console.log(country);
    await activityCreate.addCountries(country);

    return res.send(activityCreate);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const { name, dificulty, duration, season } = req.body;
  const { id } = req.params;
  try {
    await Activity.update(
      { name, dificulty, duration, season },
      {
        where: {
          id: id,
        },
      }
    );
    res.status(200).send("Actividad Actualizada");
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Activity.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).send("Actividad Eliminada");
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

module.exports = router;
