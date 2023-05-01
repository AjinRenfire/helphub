import { useState, useContext } from 'react'
import { Form, redirect, useNavigate, useNavigation } from 'react-router-dom'

// components
import FormInput from '../../Components/input-component/input-component'
import TextArea from '../../components/text-area-component/TextArea'
import InputRadio from '../../components/radio-component/radio-component'
import Button from '../../Components/button-component/button-component'

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
    chatRoomUID: ''
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

    console.log("current user id : ", localStorage.getItem("userUID"))

    // function to update the category, on radio button clicks
    const ClickHandler = (event) => {
        setCategory(event.target.value)
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
                        className: '',
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
                    label='Cost for helping me out'
                    inputOptions={{
                        className: '',
                        type: 'number',
                        name: 'job-cost',
                        required: true,
                    }}
                />
                </div>
                

                {
                    navigation.state === 'submitting' ? (
                        <Button 
                            buttonOptions={{
                                className:'bg-slate-200 px-6 rounded-full w-3/4 text-slate-600 py-2 mt-10 mb-10',
                                type:'button',
                                value:'Please Wait...',
                            }}
                            disabled={true}
                        />
                    ) : (
                        <Button 
                            buttonOptions={{
                                className:' bg-violet-500 px-6 rounded-full w-3/4 text-white py-2 hover:bg-violet-900 mt-10 mb-10',
                                type:'submit',
                                value:'Post Job',
                            }}
                        />
                    )
                }
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
    const cost = formData.get('job-cost')

    let job = {}

    if(category === 'Others')
        // inclusing the description of the others category too
        job = {...DEFAULT_JOB, status: JOB_PUBLIC_STATUS.NO_REQUESTS_YET, title, description, category, others: othersDescription, deadline, cost}
    else
        job = {...DEFAULT_JOB, status: JOB_PUBLIC_STATUS.NO_REQUESTS_YET, title, description, category, deadline, cost}

    await createJobDocument(job)

    return redirect('/app/my-jobs/no-requests')
}