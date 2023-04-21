import { Link } from 'react-router-dom'
import React from 'react';
// css
import './tab-component.css'

export default function WhatsappTabs(props){
    console.log(props.target);
    return (
        <div className='tab-container'>
            <Link className='tab-links' to={props.target}>Active Jobs</Link>
            <span>Pending Requests</span>
            <span>Jobs History</span>
        </div>
    )
}