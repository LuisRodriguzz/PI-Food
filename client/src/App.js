import './App.css';
import{BrowserRouter, Route, Switch} from 'react-router-dom'
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import AddRecipe from './components/AddRecipe';
import { getDiets } from './actions';
import { useDispatch} from "react-redux";
import React, {useEffect} from 'react';
import RecipeDetail from './components/DetailedRecipe';
import Page404 from './components/Page404';

function App() {
  
    const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getDiets());
}, []);   

  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
      <Route exact path='/' component={LandingPage}/>
      <Route exact path='/recipes' component={Home}/>
      <Route exact path='/recipes/AddRecipe' component={AddRecipe}/>
      <Route exact path='/recipes/:id' component={RecipeDetail}/>
      <Route path='*' component={Page404}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;

