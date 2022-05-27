import { useEffect } from "react"
import { useCallback, useState } from "react"

export const useTextInput = initialValue => {
    const [value, setValue] = useState(initialValue)
    const handleChange = useCallback(event => setValue(event.target.value), [])
    return [value, handleChange]
}

export const useUserData = () => {
    const [userData, setUserData] = useState({})
    useEffect(() => {
        fetch(`http://localhost:5000/userprofile`, {
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('tokenStorage')}`}})
            .then(response => response.ok? response.json() : {})
            .then(userData => setUserData(userData))
    }, [])
    return userData
}