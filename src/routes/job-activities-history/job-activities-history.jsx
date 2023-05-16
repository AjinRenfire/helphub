
import React from "react"

import ListMsg from "../../Components/ListMsg"

import SharkImg from "../../assets/imgs/list-imgs/shark-lazy.png"

export default function JobActivitiesHistoryPage(){
    return (
        <ListMsg image={SharkImg} message={"What ?! You havn't done anything..."}/>
    )
}