export default function FormInput({label, inputOptions, min}){
    return (
        <div className=" appearance-none space-y-1"
                
        >
            {label && <><span className=' text-gray-700 text-sm'>{label}</span> <br/></> }
            <input 
                {...inputOptions}
                min={min ? min : null}
                className=' appearance-none border-b-2 focus:border-violet-600 focus:outline-none h-8 autofill:bg-white'
            /> <br/>
        </div>
    )
}