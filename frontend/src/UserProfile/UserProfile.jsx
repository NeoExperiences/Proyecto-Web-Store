import {Route, Routes} from "react-router-dom"

import {UserProfileData} from './UserProfileData'

export const UserProfile = () => {
    return(
        <Routes>
            <Route path="/" element={<UserProfileData/>}/>
        </Routes>
    )
}