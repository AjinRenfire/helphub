// css
import './button-style.css'

export default function Button({buttonOptions, disabled}){
    return (        
        <div 
            className="flex justify-center items-center"
            
        >
            <button 
                {...buttonOptions}
                disabled={disabled}
            >{ buttonOptions.value }</button>
        </div>
    )
}