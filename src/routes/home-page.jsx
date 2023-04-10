import { useNavigate } from 'react-router-dom'
import Navbar from '../Components/Navbar'
// css
import '../App.css'

export default function HomePage(){
    const navigate = useNavigate()

    return (
        <>
            <Navbar />
            <div className="main-section">
                <h1 className="main-title">HelpHub</h1>
                <p className="main-text">“Your Guide To Community Support”</p>
                <button className="main-signup">Join Us</button>
            </div>
            <h1>fasfdas</h1>
        </>
    )
}