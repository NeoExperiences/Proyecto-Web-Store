import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { PictureCard } from "./PictureCard";

export const PictureDetails = () => {
    const { id } = useParams()
    const [picture, setPicture] = useState({})

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/photos/${id}`)
            .then(response => response.json())
            .then(picture => setPicture(picture))
    }, [id])
    return(
        <div>
            <PictureCard title={picture.title} id={picture.id} thumbnailUrl={picture.thumbnailUrl}/>
            <Link to={"/Pictures"}><Button>Go Back</Button></Link>
        </div>
    )
}