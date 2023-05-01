export default function TextArea({label, inputOptions}){
    return (
        <div className="appearance-none space-y-1"
            style={{margin: inputOptions.className ? '15px 0' : '15px auto'}}    
        >
            {label && <><span className=' text-gray-700 text-sm'>{label}</span> <br/></> }
            <textarea
                {...inputOptions}
            /> <br/>
        </div>
    )
}