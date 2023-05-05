import { useState, useContext, useEffect } from 'react'
import { Form, redirect, useNavigate, useNavigation } from 'react-router-dom'

// components
import FormInput from '../../Components/input-component/input-component'
import TextArea from '../../components/text-area-component/TextArea'
import InputRadio from '../../components/radio-component/radio-component'
import Button from '../../Components/button-component/button-component'

import {FiMapPin} from 'react-icons/fi'

// firebase
import { createJobDocument } from '../../firebase/firebase.job'

// default job object
var DEFAULT_JOB = {
    jobUID: '',
    title: '',
    description: '',
    creatorName: '',
    creatorUID: '',
    createdAt: '',
    category: '',
    others: '',
    deadline: '',
    cost: '',
    requestorsUID: [],
    status: '',
    privateJobStatus: '',
    helperUID: '',
    chatRoomUID: '',
    location: ''
}

var VARIOUS_CATEGORIES = [
    'Shopping',
    'Medical',
    'Event Organising',
    'Education',
    'Others'
]

export const JOB_PUBLIC_STATUS = {
    NO_REQUESTS_YET : 'No requests yet',
    REQUESTS_ARRIVED : 'Requests arrived',
    YOU_ACCEPTED_THE_JOB : 'Accepted',
    JOB_COMPLETED : 'Job successfully completed!'
}

export const JOB_PRIVATE_STATUS = {
    WORK_STILL_IN_PROGRESS : 'Work Still In Progress',
    WORK_COMPLETED : 'Work Completed',
}

export default function PostJobPage() {
    const [category, setCategory] = useState(null)
    const navigate = useNavigate()
    const navigation = useNavigation()

    const [currentLocation , setCurrentLocation] = useState("Your Area");
    const [lat , setLat] = useState("");
    const [long, setLong] = useState("");

    const [version, setVersion] = useState(0);

    function handleReset() {
        setVersion(version + 1);
      }
    

    // function to update the category, on radio button clicks
    const ClickHandler = (event) => {
        setCategory(event.target.value)
    }

    useEffect(
        ()=>{
            navigator.geolocation.getCurrentPosition(
                (position)=>{
                    setLat(position.coords.latitude);
                    setLong(position.coords.longitude);
                }
            )
        },[]
    )

    async function HandleLocationClick (){

        navigator.geolocation.getCurrentPosition(
            (position)=>{
                setLat(position.coords.latitude);
                setLong(position.coords.longitude);
            }
        )

        const locationResponse = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&appid=4921796711cdf71e1e0b21591032991c`);
        const locationJson = await locationResponse.json();
        setCurrentLocation(locationJson[0].name)
        
        
        
    }

    // function to determine the min date for the deadline
    function minDateAndTime(){
        const dateObj = new Date();
        const month = dateObj.getMonth() < 10? "0"+(dateObj.getMonth()+1).toString():(dateObj.getMonth()+1);
        const d = dateObj.getDate() < 10? "0"+(dateObj.getDate()).toString():(dateObj.getDate());

        const date = `${dateObj.getFullYear()}-${month.toString()}-${dateObj.getDate()}`

       
        const time = `T00:00`;


        // console.log(date.toString()+time.toString());
        
        return date.toString()+time.toString();
    }

   

    return (
        <div className="mt-20 w-full block lg:ml-96 lg:w-2/3 ">
            <div className='block mx-auto w-1/2 lg:w-2/3 '>
            <h2 className=' text-lg mb-10'>Post a job</h2>
            {/* <span>Fill in the particulars and let our community help you!</span> */}
            
            <Form method='post' action='/app/post' className='flex flex-col space-y-5'>
                {/* Title box */}
                <FormInput
                    label='Title'
                    inputOptions={{
                        className: 'w-80',
                        type: 'text',
                        name: 'job-title',
                        placeholder: 'Enter a title',
                        required: true,
                        minLength: 5,
                        maxLength: 90
                    }}
                />

                {/* Description box */}
                <TextArea
                    label='Description'
                    inputOptions={{
                        className: ' appearance-none border-b-2 focus:border-violet-600 focus:outline-none ',
                        type: 'text',
                        name: 'job-description',
                        placeholder: 'Enter a description',
                        required: true,
                        rows: 5,
                        cols: 50,
                        minLength: 10,
                        maxLength: 1000,

                    }}
                />
                
                <span className=' text-gray-700 text-sm'>Category</span>
                <div className="flex items-center space-x-3 ">
                    {
                        VARIOUS_CATEGORIES.map((category) => (
                            <InputRadio
                                label={category}
                                name={category}
                                handler={ClickHandler}
                                key={category}
                            />
                        ))
                    }                    
                </div>

                {/* Others title box */}
                { category === 'Others' && 
                    (
                        <FormInput
                            label='Others'
                            inputOptions={{
                                className: '',
                                type: 'text',
                                name: 'others-title',
                                placeholder: 'Custom category',
                                required: true,
                                minLength: 5,
                                maxLength: 90
                            }}
                        />
                    )
                }

                <div className='flex items-center space-x-16 pt-6'>
                        {/* Deadline date */}
                    <FormInput
                        label='Deadline'
                        inputOptions={{
                            className: '',
                            type: 'datetime-local',
                            name: 'job-deadline',
                            required: true,
                            
                        }}
                        min={minDateAndTime().toString()}
                    />

                    {/* Job cost */}
                    <FormInput
                        label='Cost '
                        inputOptions={{
                            className: 'w-4',
                            type: 'number',
                            name: 'job-cost',
                            required: true,
                        }}
                    />

                    
                    
                </div>

                   {/* location */}
                   <div className='px-6  py-2  flex items-center space-x-2 mx-auto' onClick={HandleLocationClick}>
                        
                        <Button 
                            buttonOptions={{
                                name:"jo-location",
                                type:'button',
                                value:currentLocation,
                            }}
                            
                        />
                        <input type="hidden" name="job-location" value={currentLocation} />
                        <FiMapPin />
                    </div>
                

                {/* buttons */ }
                <div className=' flex items-center space-x-4'> 
                {
                    navigation.state === 'submitting' ? (
                        // <Button 
                        //     buttonOptions={{
                        //         className:'bg-slate-200 px-6 rounded-full w-3/4 text-slate-600 py-2 mt-10 mb-10',
                        //         type:'button',
                        //         value:'Please Wait...',
                        //     }}
                        //     disabled={true}
                        // />
                        <button 
                            type="button" 
                            className='bg-slate-200 px-6 rounded-full w-3/4 text-slate-600 py-2 mt-10 mb-10'
                            value="Please Wait..."
                            disabled={true}
                        >
                            Pleast Wait...
                        </button>
                    ) : (
                        <button 
                            type="submit" 
                            className='bg-violet-500 px-6 rounded-full w-3/4 text-white py-2 hover:bg-violet-900 mt-10 mb-10'
                            value="Post Job"
                        >
                            Post Job
                        </button>
                    )
                }
                    
                    <button 
                        type="reset" 
                        className='border border-violet-500 px-6 rounded-full w-3/4 text-violet-500 py-2 hover:bg-violet-500 hover:text-white mt-10 mb-10'
                        onClick={handleReset}
                    >
                        Reset
                    </button>
                </div>
                
                </Form>
            </div>
            
        </div>
    )
}

// function to execute when the form is submitted
export const PostJobAction = async ({request}) => {
    const formData = await request.formData()

    // getting the inputs data
    const title = formData.get('job-title')
    const description = formData.get('job-description')
    const category = formData.get('category')
    const othersDescription = formData.get('others-title')
    let deadline = formData.get('job-deadline').toString()
    let date = deadline.substring(0,deadline.indexOf("T"));
    let time = deadline.substring(deadline.indexOf("T")+1 );
    deadline = date+" "+time;
    const cost = formData.get('job-cost');
    let location = formData.get('job-location');
    
    if(location === "Your Area"){
        location="Any";
    } 

    let job = {}

    if(category === 'Others')
        // inclusing the description of the others category too
        job = {...DEFAULT_JOB, status: JOB_PUBLIC_STATUS.NO_REQUESTS_YET, title, description, category, others: othersDescription, deadline, cost,location}
    else
        job = {...DEFAULT_JOB, status: JOB_PUBLIC_STATUS.NO_REQUESTS_YET, title, description, category, deadline, cost,location}

    await createJobDocument(job)

    return redirect('/app/my-jobs/no-requests')
}