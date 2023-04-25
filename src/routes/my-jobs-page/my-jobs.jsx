import { useLoaderData, Outlet, Await } from "react-router-dom"
import { Suspense } from "react"

// components
import WhatsappTabs from "../../components/tab-component/tab-component"

// css
import './my-jobs.css'

export default function MyJobsPage(){
    const loaderData = useLoaderData()

    const refresh = () => {
        window.location.reload(true)
    }

    return (
        <div className="view">
            <WhatsappTabs
                firstText='Active Job'
                firstLink='/app/my-jobs/active'
                secondText='Pending Requests'
                secondLink='/app/my-jobs/pending-requests'
                thirdText='No requests yet'
                thirdLink='/app/my-jobs/no-requests'
                fourthText='Job History'
                fourthLink=''
            />

            <Outlet context={{loaderData, refresh: refresh}} />
        </div>
    )
}