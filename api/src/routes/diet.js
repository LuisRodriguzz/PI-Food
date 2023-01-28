const { Router } = require('express');
const { Recipe, Diet } = require("../db")
const router = Router();
const axios = require("axios");


router.get("/", async (req, res) => {

    var dietsList = await Diet.findAll();

    if (!dietsList.length) {

        const ApiDiets = await axios.get("https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5/information&number=100")

        const allDiets = ApiDiets.data.results.map(e => e.diets).flat()

        let diets = []

        allDiets.forEach((e) => { if (!diets.includes(e)) diets.push(e) })

        for (const name of diets) {
            const dietsDb = await Diet.create({ name });
            dietsList.push(dietsDb);
        }

    }

    return res.send(dietsList);

});

module.exports = router;