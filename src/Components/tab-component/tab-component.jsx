import { Link } from 'react-router-dom'

// css
import './tab-component.css'

export default function WhatsappTabs(){
    return (
        <div className='tab-container'>
            <Link className='tab-links' to={'/app/my-jobs/active'}>Active Jobs</Link>
            <span>Pending Requests</span>
            <span>Jobs History</span>
        </div>
    )
}