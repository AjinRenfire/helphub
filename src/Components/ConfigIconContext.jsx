import { IconContext } from "react-icons";

export default function ConfigIcon({ children }) {

    return (
        <>
            <IconContext.Provider value={{ className:"text-2xl" }}>
                {children}
            </IconContext.Provider>
        </>
    );
}