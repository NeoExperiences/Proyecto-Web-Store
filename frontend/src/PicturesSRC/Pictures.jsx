import { Route, Routes } from "react-router-dom"
import { PictureList } from "./PictureList"
import { PictureDetails } from "./PictureDetails"

export const Pictures = () => {
    return (
        <Routes>
            <Route path="/" element={<PictureList/>}></Route>
            <Route path="/:id" element={<PictureDetails/>}></Route>
        </Routes>
    )
}
