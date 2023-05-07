import { IconContext } from "react-icons";

export default function ConfigIcon({ children }) {

    return (
        <>
            <IconContext.Provider value={{ className:"text-2xl hover:font-black hover:fill-gray-800" }}>
                {children}
            </IconContext.Provider>
        </>
    );
}