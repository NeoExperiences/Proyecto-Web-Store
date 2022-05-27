import {Route, Routes} from "react-router-dom"

import {UsersData} from './UsersData'

export const Users = () => {
    return(
        <Routes>
            <Route path="/" element={<UsersData/>}/>
        </Routes>
    )
}