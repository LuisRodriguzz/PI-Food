import React from 'react'
import { Link } from "react-router-dom";
import page404 from '../styledComponents/page404.css'

function Page404() {
    return (
        <div className="ErrorPage">
            <img src={page404} alt="" />
        </div>
    )
}

export default Page404