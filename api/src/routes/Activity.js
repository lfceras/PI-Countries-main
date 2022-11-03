const { Router } = require('express');
const { Activity, Country } = require('../db.js');
const { Op } = require("sequelize")

const router = Router();

router.get('/', async (req, res) => {
  try {
    const getAllActivities = await Activity.findAll()
    getAllActivities.length
      ? res.status(200).json(getAllActivities)
      : res.status(404).send("No se encontraron actividades")
  } catch (error) {
    console.log("ACA ESTA OTRO ERROR", error);
  }
})


router.post('/', async (req, res) => {
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
      return res.status(404).send("Te faltaron algunos campos")
    }
    const activityCreate = await Activity.create({
      name,
      dificulty,
      duration,
      season,

    })

    const country = await Country.findAll({
      where: { id: countries }
    })
    await activityCreate.addCountries(country)


    return res.send(activityCreate)
  }
  catch (error) {
    console.log("ERROR EN EL POST", error);
  }
})


module.exports = router;