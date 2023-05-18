// assets
import BackButtonImage from '../../assets/arrow-left.png'

import {FiArrowLeft} from "react-icons/fi"

// css
import './back-button.css'

export default function BackButton({back}){
    return (
        <div className='hover:cursor-pointer' onClick={back} >
            <FiArrowLeft className=' text-3xl font-semibold rounded-full hover:bg-slate-200'/>
        </div>
    )
}