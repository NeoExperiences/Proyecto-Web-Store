import {Route, Routes} from "react-router-dom"

import {ProductsList} from './ProductsList'

export const Products = () => {
    return(
        <Routes>
            <Route path="/" element={<ProductsList/>}/>
        </Routes>
    )
}