import { useState, useContext } from 'react'
import { Form, redirect, useNavigate, useNavigation } from 'react-router-dom'

// components
import FormInput from '../../components/input-component/input-component'
import TextArea from '../../components/text-area-component/TextArea'
import InputRadio from '../../components/radio-component/radio-component'
import Button from '../../components/button-component/button-component'

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
    helperUID: ''
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
    REQUESTS_ARRIVED: 'Requests arrived',
    YOU_ACCEPTED_THE_JOB: 'Accepted',
    JOB_COMPLETED: 'Job successfully completed!'
}

export default function PostJobPage() {
    const [category, setCategory] = useState(null)
    const navigate = useNavigate()
    const navigation = useNavigation()

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

        const hrs = dateObj.getHours();
        const mins = dateObj.getMinutes();

        const time = `T${hrs}:${mins}`;


        console.log(date.toString()+time.toString());
        
        return date.toString()+time.toString();
    }

    function setDateWithAddTenMins() {
        const dateAndTime = minDateAndTime();
        const timeStr = dateAndTime.substring(dateAndTime.indexOf("T")+1);
        let minutes =  parseInt(timeStr.substring(timeStr.indexOf(":")+1));
        minutes+=10;
        let hrs = parseInt(timeStr.substring(0,timeStr.indexOf(":")));
        if(minutes > 59 ){
            ++hrs;
            minutes = minutes%60;
        }

        const date = dateAndTime.substring(0,dateAndTime.indexOf("T"));
        console.log(`${date}T${hrs}:${minutes}`)
        return `${date}T${hrs}:${minutes}`
    }

    return (
        <div className="view">
            <h2>Post a job</h2>
            <span>Fill in the particulars and let our community help you!</span>
            
            <Form method='post' action='/app/post'>
                {/* Title box */}
                <FormInput
                    label='Title'
                    inputOptions={{
                        className: 'modified',
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
                        className: 'modified',
                        type: 'text',
                        name: 'job-description',
                        placeholder: 'Enter a description',
                        required: true,
                        rows: 10,
                        cols: 100,
                        minLength: 10,
                        maxLength: 1000,

                    }}
                />
                
                <span>Category</span>
                <div className="radio-box">
                    {
                        VARIOUS_CATEGORIES.map((category) => (
                            <InputRadio
                                label={category}
                                name='category'
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
                                className: 'modified',
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

                {/* Deadline date */}
                <FormInput
                    label='Deadline'
                    inputOptions={{
                        className: 'modified',
                        type: 'datetime-local',
                        name: 'job-deadline',
                        required: true,
                        value:setDateWithAddTenMins(),
                    }}
                    min={minDateAndTime().toString()}
                />

                {/* Job cost */}
                <FormInput
                    label='Cost for helping me out'
                    inputOptions={{
                        className: 'modified',
                        type: 'number',
                        name: 'job-cost',
                        required: true,
                    }}
                />

                {
                    navigation.state === 'submitting' ? (
                        <Button 
                            buttonOptions={{
                                className:'login-button modified',
                                type:'button',
                                value:'Please Wait...',
                            }}
                            disabled={true}
                        />
                    ) : (
                        <Button 
                            buttonOptions={{
                                className:'login-button modified',
                                type:'submit',
                                value:'Post Job',
                            }}
                        />
                    )
                }
            </Form>
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
    const deadline = formData.get('job-deadline')
    const cost = formData.get('job-cost')

    let job = {}

    if(category === 'Others')
        // inclusing the description of the others category too
        job = {...DEFAULT_JOB, status: JOB_PUBLIC_STATUS.NO_REQUESTS_YET, title, description, category, others: othersDescription, deadline, cost}
    else
        job = {...DEFAULT_JOB, status: JOB_PUBLIC_STATUS.NO_REQUESTS_YET, title, description, category, deadline, cost}

    await createJobDocument(job)

    return redirect('/app/my-jobs/active')
}