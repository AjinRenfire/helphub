import React from "react";
import { Outlet } from "react-router-dom";

import WhatsappTabs from "../../components/tab-component/tab-component"


import "./jobactivities.css"

export default function JobActivitesPage(){
    return (

        <div className="view">
            <WhatsappTabs
                firstText='Áctive Job'
                firstLink=''
                secondText='Pending Requests'
                secondLink=''
                thirdText='Job History'
                thirdLink=''
            />

            <Outlet />
        </div>
    
    )
}