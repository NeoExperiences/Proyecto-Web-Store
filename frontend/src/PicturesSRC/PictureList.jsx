import { Col, Container, Form, Row } from "react-bootstrap"
import { PictureCard } from "./PictureCard"
import { useEffect, useState } from "react"
import { useTextInput } from '../SharedHooks/customHooks'



export const PictureList = () => {
    const [list, setList] = useState([])
    const [filter, setFilter] = useTextInput('')

    const handleFilter = async event => {
        event.preventDefault()
        const response = await fetch(`https://jsonplaceholder.typicode.com/photos/${filter}`)
        const picture = await response.json()
        if (response.status === 200)
            setList([].concat(picture).slice(0,52))
        else
            setList([])
    }


    useEffect(() => {
        const fetchPictures = async() => {
            const response = await fetch('https://jsonplaceholder.typicode.com/photos')
            const pictures = await response.json()
            setList(pictures.slice(0,52))
        }
        fetchPictures()
    }, [])
    return(
        <Container fluid>
            
            <Row>
                    <Col>
                        <Form onSubmit={ handleFilter }>
                            <Form.Label>Filter</Form.Label>
                            <Form.Control onChange={setFilter} value={filter} type='text' placeholder="Picture Number"></Form.Control>
                        </Form>
                    </Col>
            </Row>
            <Row>{
                list.map(
                    ({id, title, thumbnailUrl}) => 
                    <Col key={id}>
                        <PictureCard  title={title} thumbnailUrl={thumbnailUrl} id={id}/>
                    </Col>
                )
            }
            </Row>
        </Container>
    )
}

