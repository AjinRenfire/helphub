// css
import './input-style.css'

export default function FormInput({label, inputOptions}){
    return (
        <div className="input-container">
            {label && <><span>{label}</span> <br/></> }
            <input 
                {...inputOptions}
            /> <br/>
        </div>
    )
}