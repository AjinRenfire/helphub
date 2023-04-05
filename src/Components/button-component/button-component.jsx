// css
import './button-style.css'

export default function Button({buttonOptions}){
    return (
        <div className="input-container">
            <button 
                {...buttonOptions}
            >{ buttonOptions.value }</button>
        </div>
    )
}