import React, { useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { useEffect } from "react";
import '../styledComponents/detailedRecipe.css';
import axios from "axios";



export default function RecipeDetail() {


    const [myRecipe, setMyRecipe] = useState(null)

    let { id } = useParams()
    let history = useHistory()

    console.log(id)

    useEffect(() => {
        axios.get(`pi-food-production-2982.up.railway.app/api/recipes/${id}`)
            .then((response) => {  // este response es videogame
                response.data.length > 0 ?
                    setMyRecipe(response.data[0]) :
                    setMyRecipe(response.data)
            })
        return () => {
            setMyRecipe(null)   // al hacer esto estoy haciendo un cleanup, si se usa redux necesito hacer esto
        }
    }, [])

    console.log('myRecipe')
    console.log(myRecipe)

    var myNewRecipe = {}
    myNewRecipe = myRecipe

    console.log('myNewRecipe')
    console.log(myNewRecipe)

    async function deleteRecipe(id) {
        if (myNewRecipe.createdInDb) {
            await axios.delete(`pi-food-production-2982.up.railway.app/api/recipes/delete/${id}`);
            history.push('/recipes')
        }
    }

    return (
        <div className="detailBackGround">
            <Link to='/recipes/'>
                <button className="searchHomeButton">Home</button>
            </Link>
            {
                myNewRecipe ?
                    <div>
                        {myNewRecipe.createdInDb ?
                            <button className="searchHomeButton" onClick={() => deleteRecipe(id)} onHov>Delete</button> :
                            <div></div>}
                        <h1 className="titleDetail">{myNewRecipe.name}</h1>
                        <img src={myNewRecipe.image} alt="image" className="imgDet" />
                        <p className="titleDetail">Dish Summary: {myNewRecipe.dishSummary}</p>
                        <p className="healthScoreDetail">Healt Score: {myNewRecipe.healthScore}</p>
                        <p className="titleDetail">Step By Step: {myNewRecipe.createdInDb ? myNewRecipe.stepByStep : myNewRecipe.stepByStep.map(el => el + (' '))}</p>
                        
                        <ul className="listDetail" >Diets: {!myNewRecipe.createdInDb ?
                            myNewRecipe.diets.map(elem => (
                                <li className="dietItem" key={elem} >
                                    <a className="eachTagA" >{elem}</a>
                                </li>
                            )) :
                            myNewRecipe.diets.map(elem => (
                                <li className="dietItem" key={elem.name} >
                                    <a className="eachTagA" >{elem.name}</a>
                                </li>))
                        }
                        </ul >


                    </div> : <p>Loading..</p>
            }
        </div>
    )
}