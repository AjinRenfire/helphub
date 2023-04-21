import { useEffect, useState } from "react"
import { useLoaderData, Outlet } from "react-router-dom"

// components
import WhatsappTabs from "../../components/tab-component/tab-component"

// css
import './my-jobs.css'

export default function MyJobsPage(){
    const loaderData = useLoaderData()

    return (
        <div className="view">
            <WhatsappTabs target="/app/my-jobs/active"/>

            <Outlet context={{loaderData}} />
        </div>
    )
}