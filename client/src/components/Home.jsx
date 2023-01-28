import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getRecipes } from '../actions'
import { Link } from "react-router-dom";
import RecipeCard from './RecipeCard';
import Paginated from "./Paginated";
import { filterRecipeByDiet, sort, sortHealthScore } from "../actions";
import SearchBar from "./SearchbBar";
import '../styledComponents/home.css';

export default function Home() {

    let recipes = useSelector((state) => state.filteredRecipes)
    let dispatch = useDispatch()
    
    // Aqui comienza lo de paginado
    const [currentPage, setCurrentPage] = useState(1)
    const [recipePerPage, setRecipePerPage] = useState(9)
    const indexOfLastRecipe = currentPage * recipePerPage // 4
    const indexOfFirstRecipe = indexOfLastRecipe - recipePerPage // 0
    const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe) // 0 al 3

    const paginated = ( pageNumber ) => {
        setCurrentPage(pageNumber)
     }
     
      function handleOnClickNextPage (){
        if ((Math.ceil(recipes.length / recipePerPage)) > (currentPage)){
        setCurrentPage(currentPage + 1)
        }  
     } 

     function handleOnClickPreviusPage (){
        if (1 < currentPage){
        setCurrentPage(currentPage - 1)
        }  
     } 

    // aqui finaliza lo de paginado y se agrega al div

    useEffect(() => {
        dispatch(getRecipes())
    }, [dispatch])

    function onSelectChangeOrder(e) {
        e.preventDefault();
        dispatch(sort(e.target.value))
    }

    function onSelectChangeHealthScore(e) {
        e.preventDefault();
        dispatch(sortHealthScore(e.target.value))
    }

    function onSelectChangeFilterDiet(e) {
        e.preventDefault();
        dispatch(filterRecipeByDiet(e.target.value))
    }


    function handleOnClickReset(e) {
        e.preventDefault();
        dispatch(getRecipes());
    }

    

    const dietsAll = useSelector((state) => {console.log(state.diets); return state.diets})

    return (
        <div className="homeBackGround">
            <SearchBar />
            <h1 className="homeTitlePincipal">Recipes Finder</h1>
            <button onClick={e => { handleOnClickReset(e) }} className="homeResetPages">
                Reset
            </button>
            <div className="homeSelects">
                <select name="selectOrder" onChange={onSelectChangeOrder}>
                    <option value='ORDER_A-Z'>Order A-Z</option>
                    <option value='ORDER_Z-A'>Order Z-A</option>
                </select>
                <select name="selectHealthScoreOrder" onChange={onSelectChangeHealthScore}>
                    <option value='HEALTH_SCORE_ASCENDENT'>Health Score Ascendent</option>
                    <option value='HEALTH_SCORE_DESCENDENT'>Health Score Descendent</option>
                </select>
                <select name="selectFiler" onChange={e => onSelectChangeFilterDiet(e)}>
                    <option value='ALL'>All Diet</option>
                    {dietsAll && dietsAll.map((diet) => (
                        <option value={diet.name} key={diet.id}>{diet.name}</option>
                    ))}
                    
                    <option value="gluten free">Gluten Free</option>
                    <option value="ketogenic">Ketogenic</option>
                    <option value="vegetarian">Vegetarian </option>
                    <option value="lacto-vegetarian">Lacto-Vegetarian </option>
                    <option value="lacto ovo vegetarian">Ovo-Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="pescatarian">Pescatarian</option>
                    <option value="paleolithic">Paleolithic</option>
                    <option value="primal">Primal</option>
                    <option value="whole 30">Whole 30</option>
                </select>
                </div>
                <div>

                <Paginated
                    recipePerPage={recipePerPage}
                    recipes={recipes.length}
                    paginated={paginated}
                />
                <div>
                <button onClick={(e) => { handleOnClickPreviusPage(e) }} className="homeNextPreviusPages">
                previus page
               </button>
                <button onClick={(e) => { handleOnClickNextPage(e) }} className="homeNextPreviusPages">
                next page
               </button>
                </div>
                
                {currentRecipes && currentRecipes.map((element) => {

                    return (
                        <div  className="homeCardGrid" >
                            <Link to={'/recipes/' + element.id}>
                                <RecipeCard
                                    id={element.id}
                                    name={element.name}
                                    image={element.image}
                                    dishSummary={element.dishSummary}
                                    healthScore={element.healthScore}
                                    stepByStep={element.stepByStep}
                                    diets={element.diets}
                                />
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}