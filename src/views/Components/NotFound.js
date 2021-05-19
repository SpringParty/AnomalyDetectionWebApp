import React from 'react';
import { Link } from 'react-router-dom';
import gif from 'assets/img/404.gif';
import './NotFound.css';

export default function NotFound(props) {    
    return (
        <div>
            <Link to="/">
                <img src={gif} alt="404" className="center-fit"></img>
            </Link>
        </div>
    );
}