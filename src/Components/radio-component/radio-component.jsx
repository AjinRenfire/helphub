// css
import './radio-component.css'

export default function InputRadio({label, name, handler}){
    return (
        <div className=" space-x-2 flex items-center justify-center">
            <input 
                type='radio' 
                id={name}
                name="category"  
                className={`peer w-3 h-3 checkbox appearance-none ring-2 ring-gray-300 hover:ring-violet-600  focus:border-4 focus:border-violet-600 rounded-full cursor-pointer checked:border-4 checked:border-violet-600`}
                value={label}
                onChange={handler}
            />
            <label className={`hover:text-violet-600 peer-checked:text-violet-600 peer-hover:text-violet-600`} htmlFor={name}>{label}</label>
        </div>
    )
}