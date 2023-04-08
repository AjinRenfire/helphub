// css
import './alert-box.style.css'

export default function AlertBox({message, visibility, positive}){
    return (
        visibility && (
            <div className="alert-box"
                style={{
                    // positive message - green background color
                    // negative message - red background color
                    backgroundColor: positive ? 'green' : 'red'
                }}
            >
                <span>{message}</span>
            </div>
        )
    )
}