// components
import Navbar from '../Components/Navbar'

// css
// import '../App.css'

import HomeBGOne from "../assets/imgs/home-bg-2.png";
import About from "../assets/imgs/grow.png";

export default function HomePage(){
    return (
        <>
            <Navbar />
            <div className="flex justify-center items-center flex-col h-screen space-y-4 bg-no-repeat bg-origin-border bg-bottom bg-[length:426px_266px]" style={{backgroundImage:`url(${HomeBGOne})`}}>
                
                <h1 className="bg-gradient-to-br from-purple-600 via-violet-600 to-red-400 text-transparent bg-clip-text text-7xl font-black">HelpHub</h1>
                <p className="main-text">“Your Guide To Community Support”</p>
                <button className="rounded-full bg-violet-600 text-white px-4 py-2">Join Us</button>
            </div>

            {/* about section */}
            <div className=' m-10 space-x-8'>
                <h1 className=' text-6xl font-bold text-violet-600 text-center my-10'>How it all works?</h1>
                <div className="flex justify-center items-center space-x-9" >
                <img src={`${About}`} alt="img of team work" className=' w-80 h-60'/>
                <p className=' w-1/3'>Our platform helps people to come together and help eachother out for some small 
                    amount of value.We encourage service to others for not much in return .So Let's grow together</p>
                </div>
                
            </div>
            
            
        </>
    )
}