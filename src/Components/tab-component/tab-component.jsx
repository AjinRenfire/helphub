import { Link } from 'react-router-dom'
import React from 'react';

// css
import './tab-component.css'

/**
 * 
 * This is a multi-purpose component (ofcourse, all are)
 * Different links and texts will be provided to the same, based on the context where it is being used
 * 
 * props structure:
 * firstText: text to be displayed in the first tab
 * firstLink: link that you want the user to redirect to when the first tab is pressed
 * 
 * Likewise, secondText, secondLink, thirdText, thirdLink
 */
export default function WhatsappTabs(props){
    const {firstText, firstLink, secondText, secondLink, thirdText, thirdLink, fourthText, fourthLink} = props
    
    return (
        <div className='relative mt-20 flex '>
            
            <Link className='' to={firstLink}>{firstText}</Link>
            <Link className='' to={secondLink}>{secondText}</Link>
            <Link className='' to={thirdLink}>{thirdText}</Link>
            { fourthText && (
                <Link className='' to={fourthLink}>{fourthText}</Link>
            )}
        </div>
    )
}