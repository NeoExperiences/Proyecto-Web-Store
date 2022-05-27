import { createContext, useContext, useState } from 'react'

const CreatedUserContext = createContext()

export const UserContextProvider = ({ children }) => {
    const [ role, setRole ] = useState()

    return (
        <CreatedUserContext.Provider value={{ role, setRole }}>
            {children}
        </CreatedUserContext.Provider>
    )
}

export const useUserRole = () => {
    return useContext(CreatedUserContext).role
}

export const useUserContext = () => {
    return useContext(CreatedUserContext)
}