import React from "react";
import { Link } from 'react-router-dom';
import '../styledComponents/landingPage.css';

export default function LandingPage() {
    return (
        <div className="landingBackGround">
            <h1 className="landingTitlePincipal"> Welcome to the search engine of your favorite recipe </h1>
            <Link to='/recipes/'>
                <button className="landingHomeButton">Get In</button>
            </Link>
        </div>
    )
}