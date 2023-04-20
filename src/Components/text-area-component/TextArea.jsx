export default function TextArea({label, inputOptions}){
    return (
        <div className="input-container"
            style={{margin: inputOptions.className ? '15px 0' : '15px auto'}}    
        >
            {label && <><span>{label}</span> <br/></> }
            <textarea
                {...inputOptions}
            /> <br/>
        </div>
    )
}