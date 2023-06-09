// components
import Navbar from '../Components/Navbar'

import { Link } from 'react-router-dom';
// css
// import '../App.css'

import HomeBGOne from "../assets/imgs/home-bg-2-re.png";
import About from "../assets/imgs/grow-re.png";
import HandMoney from "../assets/imgs/Hands-money-re.png"
import HelpWanted from "../assets/imgs/help-wanted-re.png";
import Helping from "../assets/imgs/helping-re.png";
import SharkMoney from "../assets/imgs/shark-money.png";
import SharkBuy from "../assets/imgs/shark-buy.png";
import SharkCry from "../assets/imgs/shark-cry.png";

export default function HomePage(){
    return (
        <div className='scroll-smooth'>
            <Navbar />
            <div id="ini" className="flex justify-center items-center flex-col h-screen space-y-4 bg-no-repeat bg-origin-border bg-bottom bg-[length:426px_266px]" style={{backgroundImage:`url(${HomeBGOne})`}}>
                
                <h1 className="bg-gradient-to-br from-purple-600 via-violet-600 to-red-400 text-transparent bg-clip-text text-7xl font-black"> HelpHub </h1>
                <p className="main-text">“Your Guide To Community Support”</p>
                <button className="rounded-full bg-violet-600 text-white px-4 py-2"><Link to={"/signup"}>Join Us</Link></button>
            </div>

            {/* about section */}
            <div className=' my-20 space-x-8 ' id="how">
                <h1 className=' text-6xl font-bold text-violet-600 text-center my-5 pt-20' >How it all works?</h1>
                <div className="flex justify-center items-center space-x-9 my-20" >
                <img src={About} alt="img of team work" className=' w-80 h-60'/>
                <p className=' w-1/3 text-lg '>Our platform helps people to come together and help eachother out for some small 
                    amount of value.We encourage service to others for not much in return .So Let's grow together</p>
                </div>
                
            </div>
            {/* about cards section */}
            <div className='flex flex-col items-center space-y-6  lg:flex-row lg:justify-center lg:items-center lg:space-x-20'>
                <div className="w-80 h-96 shadow-md py-4 rounded-md">
                    <img src={SharkCry} alt="" className=' w-60 h-60 block mx-auto'/>
                    <p className=' px-6 text-center'>You can ask for any kind of help to anyone and you can manage all of your jobs in our platform</p>
                </div>
                <div className="w-80 h-96 shadow-md py-4 rounded-md">
                    <img src={SharkBuy} alt="" className=' w-60 h-60 block mx-auto'/>
                    <p className=' px-6 text-center'>You can also help anyone from anywhere and you can manage your jobs in our platform</p>
                </div>
                <div className="w-80 h-96 shadow-md  py-4 rounded-md">
                    <img src={SharkMoney} alt="" className=' w-60 h-60 block mx-auto'/>
                    <p className=' px-6 text-center'>You can give our in-app currency as a reward for the job.Your can trade the in-app currency to fiat currency at any time.</p>
                </div>
            </div>
            {/* contact us section */}
            <div className=' mt-20 ' id='contact'>
                <h1 className=' text-6xl font-bold text-violet-600 text-center my-16'>Wanna reach out to us?</h1>
                <div className='flex justify-center items-center space-x-20'>
                    <div className='space-y-6 bg-violet-200 self-stretch px-10 rounded flex justify-center items-center flex-col '>
                        
                        <p className=' text-xl font-semibold text-slate-600 '>You can contact us on anytime by email</p>
                        <p className=' font-mono text-xl text-black '>helphub.acet@gmail.com</p>
                    </div>
                
                    <div>
                        <h3 className=' text-3xl font-semibold my-10'>Team members</h3>
                        <div className=' flex'> 
                            <ul className=' space-y-6'>
                                <li className=' px-5 text-lg hover:text-violet-600 hover:font-bold'><a href="https://github.com/Abinilla" target="_blank">Abinilla</a></li>
                                <li className=' px-5 text-lg hover:text-violet-600 hover:font-bold'><a href="https://github.com/Ahamed07" target="_blank">Ahamed Yoonus</a></li>
                                <li className=' px-5 text-lg hover:text-violet-600 hover:font-bold'><a href="https://github.com/AjinRenfire" target="_blank">Ajin</a></li>
                                <li className=' px-5 text-lg hover:text-violet-600 hover:font-bold'><a href="https://github.com/Bala-Abinesh-Surya" target="_blank">Bala Abinesh Surya</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                
            </div>
            {/* footer area */}
            <div className='mt-20 space-y-6 bg-purple-50' id="support">
                <hr />
                <div className='flex  justify-evenly mb-6'>
                    <div className=' space-y-10'>
                        <ul className=' text-gray-800 space-y-1'>
                            <li className=' font-bold'>Our terms</li>
                            <li>Privacy policy</li>
                            <li>Legal</li>
                            <li>Terms of use</li>
                            
                        </ul >
                        <ul className=' text-gray-800 space-y-1 '>
                            <li className=' font-bold'>Support</li>
                            <li>Product help</li>
                            <li>Report an issue</li>
                            <li>Helphub community</li>
                        </ul>
                    </div>
                    
                    <ul className=' text-gray-800 space-y-1'>   
                        <li className=' font-bold'>Tech used</li>
                        <li>React</li>
                        <li>React router</li>
                        <li>React icons</li>
                        <li>Tailwind</li>
                        <li>Github</li>
                        <li>Firebase</li>

                    </ul>
                    
                </div>
                <p className='text-center '>Made with 💜 by helphub team</p>
                <p className=' text-gray-500 text-center  pb-8'>Copyright © 2023 Helphub</p>
            </div>

            
            
        </div>
    )
}