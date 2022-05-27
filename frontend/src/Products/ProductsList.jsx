import { Col, Container, Row } from "react-bootstrap"

import { useEffect, useState } from "react"
import { useTextInput } from '../SharedHooks/customHooks'
import { Filter } from './ProductFilter'

export const ProductsList = () => {
    const [list, setList] = useState([])
    const [filter, setFilter] = useTextInput('')
    
    const filterByTitle = filter.lenght > 3? `?title=${filter}` : ''

    const filteredTitle = list.filter(product => product.title.includes(filter))
    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/photos/${filterByTitle}`)
        .then(response => response.ok? response.json() : [])
        .then(products => setList([].concat(products).slice(0,51)))
    }, [filterByTitle])

    return(
        <Container fluid>
            <Row>
                    <Col>
                        <Filter filter={filter} setFilter={setFilter} placeholder="Picture Title"/>
                    </Col>
            </Row>
            <Row>{
                filteredTitle.map(
                    ({id, title, thumbnailUrl}) => 
                    <Col key={id} lg="2" sm="4">
                        <div>"id": {id}</div>
                        <div>"title": {title}</div>
                    </Col>
                )
            }
            </Row>
        </Container>
    )
}
