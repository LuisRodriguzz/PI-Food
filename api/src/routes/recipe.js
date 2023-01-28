const { Router } = require('express');
const { Recipe, Diet } = require("../db")
const router = Router();
const axios = require("axios");

const getApiInfo = async () => {

    const apiUrl = await axios.get("https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5/information&number=100")

    const apiInfo = await apiUrl.data.results.map(e => {
        return {
            id: e.id,
            title: e.title,
            image: e.image,
            diets: e.diets.map(e => e),
            dishTypes: e.dishTypes.map(e => e),
            summary: e.summary,
            healthScore: e.healthScore,
            analyzedInstructions: e.analyzedInstructions.map(e => e.steps.map(e => e.step))
        }
    })

    return apiInfo
}

const getDbInfo = async () => {
    return await Recipe.findAll({
        include: {
            model: Diet,
            attributes: ["name"],
            through: {
                attributes: [],
            }
        }
    })
}

const getAllRecipes = async () => {
    const apiInfo = await getApiInfo()
    const dbInfo = await getDbInfo()
    const infoTotal = apiInfo.concat(dbInfo)
    return infoTotal
}

router.get("/", async (req, res) => {

    const { title } = req.query
    let allRecipes = await getAllRecipes()

    if (title) {
        let recipeTitles = await allRecipes.filter(e => e.title.toLowerCase().includes(title.toLocaleLowerCase()))

        recipeTitles.length ?
            res.status(200).send(recipeTitles)
            :
            res.status(404).send("Recipe not found")

    } else {
        res.status(200).send(allRecipes)
    }



})

router.get("/:id", async (req, res) => {

    const { id } = req.params
    const allRecipes = await getAllRecipes()

    if (id) {
        let recipeId = await allRecipes.filter(e => e.id == id)
        recipeId.length ?
            res.status(200).json(recipeId) : res.status(404).send("Recipe not found")
    }
})

router.delete("/:id", async (req, res) => {

    const { id } = req.params

    await Recipes.destroy({
        where: { id }
    })

    res.status(200).send("Recipe deleted")
})

router.post("/", async (req, res) => {
    try {
        let { title, summary, healthScore, analyzedInstructions, image, dietsCheck } = req.body

        let createdRecipe = await Recipe.create({
            title,
            summary,
            healthScore,
            analyzedInstructions,
            image,

        })

        let dietsDb = await Diet.findAll({
            where: { name: dietsCheck }
        });

        await createdRecipe.addDiets(dietsDb);

        res.send(createdRecipe)

    } catch (error) {
        res.status(400).send({ error: error.message })
    }

})


module.exports = router;