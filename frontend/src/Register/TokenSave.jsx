import { createContext, useContext, useState } from 'react'

const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
    const [ role, setRole ] = useState()

    return (
        <UserContext.Provider value={{ role, setRole }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserRole = () => {
    return useContext(UserContext).role
}

export const useUserContext = () => {
    return useContext(UserContext)
}