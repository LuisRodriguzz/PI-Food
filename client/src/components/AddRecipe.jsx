import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDiets, postRecipe } from "../actions";
import '../styledComponents/addRecipe.css';


 function validate(input) {
   let errors = {};
  
    if (!input.name) {
        errors.name = 'Write a name please'
    } 
    else if (input.name.length > 60){
    errors.name = '*must contain less than 60 characters'
    }
    
    else if (!input.dishSummary) {
        errors.dishSummary = 'Write a dishSummary please'
    }
     else if (input.dishSummary.length > 400){
        errors.dishSummary = '*must not exceed 400 characters'
      }
      
    return errors;

 } 
export default function AddRecipe() {

    const dispatch = useDispatch()
    const diets = useSelector((state) => state.diets)
    const [errors, setErrors] = useState({});
    let history = useHistory()

    const [input, setInput] = useState({
        name: "",
        image: "",
        dishSummary: "",
        healthScore: "",
        stepByStep: "",
        diets: [],
    })

    function onInputChange(e) {
        e.preventDefault()
        setInput({
            ...input,
            [e.target.name]: (e.target.value)
        });
        setErrors(validate({
            ...input,
            [e.target.name]: (e.target.value)
        }));
    }

    function onSelectChange(e) {
        setInput({
            ...input,
            diets: [...input.diets, e.target.value]
        })
    }

    function onSubmit(e) {
        e.preventDefault()
        console.log(input)
        dispatch(postRecipe(input))
        alert("Recipe Created")
        setInput({
            name: "",
            image: "",
            dishSummary: "",
            healthScore: "",
            stepByStep: "",
            diets: [],
        })

        history.push('/recipes')

    }

    function handleDelete(element) {
        setInput({
            ...input,
            diets: input.diets.filter(diet => diet !== element)
        })
    }

    useEffect(() => {
        dispatch(getDiets());
    }, []);

    function redirectHome(event) {
        event.preventDefault();
        window.location.href = `/recipes`;
    }

    console.log(input)

    return (

        <div className="addBackGround">
            <button name="redirectHome" class="home" onClick={redirectHome}>Home</button>
            <h1 className="addTitlePincipal">Create your Recipe</h1>
            <form onSubmit={(e) => onSubmit(e)} class="addRecipeForm" >
                <div>
                    <label htmlFor="">Name: </label>
                    <input onChange={onInputChange} name="name" type="text" value={input.name} className="addInput" placeholder="Insert a name" />
                    {errors.name && (
                        <p classname="error" >{errors.name}</p>
                    )}
                </div>
                <div>
                    <label htmlFor="">Image: </label>
                    <input onChange={onInputChange} name="image" type="text" value={input.image} placeholder="Insert an image"/>
                </div>
                <div>
                    <label htmlFor="">DishSummary: </label>
                    <input onChange={onInputChange} name="dishSummary" type="text" value={input.dishSummary} placeholder="Insert a description" />
                    {errors.dishSummary && (
                        <p classname='error' >{errors.dishSummary}</p>
                    )}
                </div>
                <div>
                    <label htmlFor="">Health Score: </label>
                    <input onChange={onInputChange} name="healthScore" type="text" value={input.healthScore} placeholder="Number between 1 and 100" />
                </div>
                <div>
                    <label htmlFor="">Step By Step: </label>
                    <input onChange={onInputChange} name="stepByStep" type="text" value={input.stepByStep} placeholder="Insert a stepByStep"/>
                </div>
                <select className="addSelectButton" name="selectDiet" onChange={(e) => onSelectChange(e)}>
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
                <button type='submit' className="addCreateButton">Create Recipe</button>
            </form>

            {input.diets.map(diet =>
                <div >
                    <p className="addChoseDiet">{diet}</p>
                    <button  className="buttonDelete" onClick={() => handleDelete(diet)}>x</button>
                </div>
            )}
        </div>
    )
}

