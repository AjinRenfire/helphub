import { Link ,NavLink} from 'react-router-dom'
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
        <div className='relative mt-20 flex justify-evenly items-center mb-10'>
            
            <NavLink className={({isActive})=>{
                return isActive? " border-b-2 text-violet-600 text-lg border-black" : "text-lg text-gray-700"
            }} to={firstLink}>{firstText}</NavLink>
            <NavLink className={({isActive})=>{
                return isActive? "border-b-2 text-violet-600 text-lg border-black" : "text-lg text-gray-700"
            }} to={secondLink}>{secondText}</NavLink>
            <NavLink className={({isActive})=>{
                return isActive? "border-b-2 text-violet-600 text-lg border-black" : "text-lg text-gray-700"
            }} to={thirdLink}>{thirdText}</NavLink>
            { fourthText && (
                <NavLink className={({isActive})=>{
                    return isActive? "border-b-2 text-violet-600 text-lg border-black" : "text-lg text-gray-700"
                }} to={fourthLink}>{fourthText}</NavLink>
            )} 
        </div>
    )
}