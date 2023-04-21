// css
import './input-style.css'

export default function FormInput({label, inputOptions, min}){
    return (
        <div className="input-container"
            style={{margin: inputOptions.className ? '15px 0' : '15px auto'}}    
        >
            {label && <><span>{label}</span> <br/></> }
            <input 
                {...inputOptions}
                min={min ? min : null}
                style={min && {width: 'fit-content', textIndent: '0px'}}
            /> <br/>
        </div>
    )
}