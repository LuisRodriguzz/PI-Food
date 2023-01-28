import axios from 'axios';

export function getRecipes(){
    return function(dispatch){
        axios.get(`pi-food-production-2982.up.railway.app/api/recipes/`)
        .then((recipes) => {
            dispatch({
                type: 'GET_RECIPES',
                payload: recipes.data
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }
}

 export function searchRecipe(search){
    return function(dispatch){
        axios.get(`pi-food-production-2982.up.railway.app/api/recipes?name=${search}`)
        .then((recipe) => {
            dispatch({
                type: 'SEARCH_RECIPE',
                payload: recipe.data
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }
} 

export function sort(order){
    return {
        type: 'SORT',
        payload: order
    }
}

export function sortHealthScore(orderHealthScore){
    return {
        type: 'SORT_HEALTH_SCORE',
        payload: orderHealthScore
    }
}

export function filterRecipeByDiet(payload){
    return {
        type: 'FILTER_BY_DIET',
        payload
}
}

 export function getDiets(){
    return function(dispatch){
        axios.get(`pi-food-production-2982.up.railway.app/api/diets/`)
        .then((diets) => {
            dispatch({
                type: 'GET_DIETS',
                payload: diets.data
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }
}

export function postRecipe(payload){
    return async function(dispatch){
       const response = axios.post(`pi-food-production-2982.up.railway.app/api/recipes/`, payload)
        console.log(response)
        return response;
        
    }
} 