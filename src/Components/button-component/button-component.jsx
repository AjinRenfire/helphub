// css
import './button-style.css'

export default function Button({buttonOptions, disabled}){
    return (        
        <div 
            className="input-container"
            style={{margin: (buttonOptions.className).toString().includes('modified') ? '15px 0' : '15px auto'}}  
        >
            <button 
                {...buttonOptions}
                disabled={disabled}
            >{ buttonOptions.value }</button>
        </div>
    )
}