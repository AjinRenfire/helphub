// assets
import BackButtonImage from '../../assets/arrow-left.png'

// css
import './back-button.css'

export default function BackButton({back}){
    return (
        <div className='back-button-div' onClick={back}>
            <img src={BackButtonImage} />
        </div>
    )
}