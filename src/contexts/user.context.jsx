import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
})

// actual component
export default function UserContextProvider({children}) {
    const [currentUser, setCurrentUser] = useState(null)
    const value = {currentUser, setCurrentUser}

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}