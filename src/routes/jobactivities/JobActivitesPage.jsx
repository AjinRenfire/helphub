import React from "react";
import { Outlet } from "react-router-dom";

import WhatsappTabs from "../../components/tab-component/tab-component"


import "./jobactivities.css"

export default function JobActivitesPage(){
    return (

        <div className="view">
            <WhatsappTabs target=""/>
            <Outlet />
        </div>
    
    )
}