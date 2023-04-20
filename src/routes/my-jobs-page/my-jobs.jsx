import { useLoaderData } from "react-router-dom"

export default function MyJobsPage(){
    const allJobsSnapshots = useLoaderData()

    return (
        <div className="view">
            {
                allJobsSnapshots.forEach((snapshot) => <h1>My jobs page</h1>)
            }
        </div>
    )
}