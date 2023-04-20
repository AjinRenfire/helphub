// css
import './radio-component.css'

export default function InputRadio({label, name, handler}){
    return (
        <div className="radio-group">
            <input 
                type='radio' 
                name={name}  
                className="radio-button" 
                value={label}
                onChange={handler}
            />
            <label>{label}</label>
        </div>
    )
}